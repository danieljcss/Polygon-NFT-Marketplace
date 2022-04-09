import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import Image from 'next/image'
import axios from 'axios'

export default function ResellNFT(props) {
  const [formInput, updateFormInput] = useState({ price: '', image: '', name: '', description: '' })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { id, tokenURI } = router.query
  const { image, price, name, description } = formInput

  useEffect(() => {
    async function fetchNFT() {
      if (!tokenURI) return
      const meta = await axios.get(tokenURI)
      updateFormInput(state => ({ ...state, image: meta.data.image, name: meta.data.name, description: meta.data.description }))
    }

    fetchNFT()
  }, [id, tokenURI])


  async function listNFTForSale() {
    if (!price) return /* TODO: Ask for price >0 */
    setIsLoading(true)
    const priceFormatted = ethers.utils.parseUnits(formInput.price, 'ether')
    let listingPrice = await props.contract.getListingPrice()

    listingPrice = listingPrice.toString()
    let transaction = await props.contract.resellToken(id, priceFormatted, { value: listingPrice })
    await transaction.wait()

    setIsLoading(false)
    router.push('/my-nfts')
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        {
          image && (
            <Image src={image} alt="" width={350} height={400} layout="responsive" className="rounded mt-4" />
          )
        }
        <div className="p-4">
          <p className="text-2xl font-semibold text-violet-100">{name}</p>
          <div>
            <p className="text-violet-300">{description}</p>
          </div>
        </div>
        <input
          placeholder="Asset Price in MATIC"
          type="number" step="0.01" min="0"
          className="mt-2 border rounded p-4 text-violet-200 border-white/20 bg-white/20
          placeholder:text-violet-300
          focus:outline-none focus:border-violet-200 focus:ring-1 focus:ring-violet-500"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        {isLoading ? (
          <button disabled className="font-bold mt-4 bg-violet-600 text-white rounded p-4 shadow-lg transition-all ease-in-out duration-500">
            <div className="spinner-border animate-spin
              inline-block
              w-6 h-6
              border-4 rounded-full
              text-violet-100
            " role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </button>
        ) : (
          <button onClick={listNFTForSale} className="font-bold mt-4 bg-violet-600 text-white rounded p-4 shadow-lg">
            List NFT
          </button>
        )}
      </div>
    </div>
  )
}