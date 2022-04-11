import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function MyAssets(props) {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const router = useRouter()
  useEffect(() => {
    if (props.account != null) {
      loadNFTs()
    }
  }, [props.account])

  async function loadNFTs() {
    const data = await props.contract.fetchMyNFTs()

    const items = await Promise.all(data.map(async i => {
      const tokenURI = await props.contract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenURI)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        tokenURI
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded')
  }

  function listNFT(nft) {
    router.push(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)
  }

  if (props.account == null) {
    return (
      <h1 className="px-10 py-10 xs:px-20 text-xl text-violet-100 flex justify-center">
        Please connect your wallet
      </h1>
    )
  }
  if (loadingState === 'loaded' && !nfts.length) {
    return (
      <h1 className="px-10 py-10 xs:px-20 text-2xl text-violet-100 flex justify-center">
        No NFTs owned
      </h1>
    )
  }
  return (
    <div className="flex justify-center">
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border border-violet-300 shadow hover:shadow-violet-100/50 hover:shadow-md rounded-xl overflow-hidden hover:scale-[1.01] transition duration-300 ease-in-out">
                <Image src={nft.image} alt="" width={500} height={500} layout='responsive' className="rounded" />
                <div className="p-4 bg-black grid grid-cols-10 items-center">
                  <div className="col-span-8 items-center pr-3">
                    <button className="w-full bg-violet-600 text-white font-bold py-2 px-12 rounded" onClick={() => listNFT(nft)}>List</button>
                  </div>
                  <div className="col-span-2 items-center">
                    <div className="flex justify-end">
                      <p className="text-xs text-violet-200 mr">Price</p>
                    </div>
                    <div className="flex justify-end">
                      <Image src="/polygon-matic-logo.svg" alt="" height={16} width={16} />
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