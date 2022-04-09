import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import NFTBlock from '../components/nftblock'
import Banner from '../components/banner'


export default function Home(props) {
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
    /* Query for unsold market items */
    const data = await props.contract.fetchMarketItems()

    /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
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
    /* needs the user to sign the transaction, so will connect to a provider if not done yet */
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

  if (loadingState === 'loaded' && !nfts.length) return (
    <>
      <Banner />
      <h1 className="px-20 py-10 text-2xl text-violet-100 flex justify-center">No items in marketplace</h1>
    </>
  )

  return (
    <>
      <Banner />
      <h1 className="px-20 py-10 text-3xl text-violet-100 flex justify-center">Featured NFTs</h1>
      <div className="flex justify-center">
        <div className="px-4" style={{ maxWidth: '1600px' }}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
            {
              nfts.slice(0, 12).map((nft, i) => (
                <NFTBlock key={i} nft={nft} buyNft={buyNft} />
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}