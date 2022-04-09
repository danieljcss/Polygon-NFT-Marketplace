import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import NFTBlock from '../components/nftblock'

export default function CreatorDashboard(props) {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const [isConnected, setIsConnected] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (props.contract !== null && props.provider !== null) {
      setIsConnected(true)
    }
  }, [props.contract, props.provider])

  useEffect(() => {
    if (isConnected) {
      loadNFTs()
    }
  }, [isConnected])

  async function loadNFTs() {
    const data = await props.contract.fetchMarketItems()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await props.contract.tokenURI(i.tokenId)
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
    setNfts(shuffleArray(items))
    //setNfts(items)
    setLoadingState('loaded')
  }

  async function buyNft(e, nft) {
    e.preventDefault()
    /* needs the user to sign the transaction, so we will connect it to a Web3Provider */
    const connect = await props.connect(e)

    /* user will be prompted to pay the asking process to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await connect.contract.createMarketSale(nft.tokenId, {
      value: price
    })
    await transaction.wait()
    router.push('/my-nfts')
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
            nfts.map((nft, i) => (
              <NFTBlock key={i} nft={nft} buyNft={buyNft} />
            ))
          }
        </div>
      </div>
    </div>
  )
}