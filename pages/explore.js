import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import Image from 'next/image'

import {
  marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

export default function CreatorDashboard() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    const data = await contract.fetchItemsListed()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))

    setNfts(items)
    setLoadingState('loaded') 
  }

  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)

    /* user will be prompted to pay the asking process to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
  }

  function shuffleArray(array) {
    let shuffled = array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

    return shuffled
  }

  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl text-violet-100 flex justify-center">No NFTs listed</h1>)
  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl py-2 text-violet-100 flex justify-center">Listed NFTs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            shuffleArray(nfts).map((nft, i) => (
              <div key={i} className="border border-violet-300 shadow rounded-xl overflow-hidden">
                <img src={nft.image} alt=""/>
                <div className="p-4">
                  <p style={{ height: '45px' }} className="text-2xl font-semibold text-violet-100">{nft.name}</p>
                  <div style={{ height: '40px', overflow: 'hidden' }}>
                    <p className="text-violet-300">{nft.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-black grid grid-cols-10 items-center">
                  <div className="col-span-8 items-center pr-3">
                    <button className="w-full bg-violet-600 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
                  </div>
                  <div className="col-span-2 items-center">
                    <div className="flex justify-end">
                    <p className="text-xs text-violet-200 mr">Price</p>
                    </div>
                    <div className="flex justify-end">
                      
                      <Image src="/polygon-matic-logo.svg" alt="" height={16} width={16}/>
                      <p className="font-semi-bold text-white ml-1">
                        {nft.price}
                      </p> 
                    </div>
                  </div>
                  
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}