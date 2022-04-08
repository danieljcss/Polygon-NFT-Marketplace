import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import Image from 'next/image'
import axios from 'axios'

export default function ResellNFT(props) {
  const [formInput, updateFormInput] = useState({ price: '', image: '' })
  const router = useRouter()
  const { id, tokenURI } = router.query
  const { image, price } = formInput

  useEffect(() => {
    async function fetchNFT() {
      if (!tokenURI) return
      const meta = await axios.get(tokenURI)
      updateFormInput(state => ({ ...state, image: meta.data.image }))
    }

    fetchNFT()
  }, [id, tokenURI])


  async function listNFTForSale() {
    if (!price) return /* TODO: Ask for price >0 */

    const priceFormatted = ethers.utils.parseUnits(formInput.price, 'ether')
    let listingPrice = await props.contract.getListingPrice()

    listingPrice = listingPrice.toString()
    let transaction = await props.contract.resellToken(id, priceFormatted, { value: listingPrice })
    await transaction.wait()

    router.push('/')
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Asset Price in MATIC"
          type="number" step="0.01" min="0"
          className="mt-2 border rounded p-4 opacity-50"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        {
          image && (
            <Image src={image} alt="" width={350} height={400} layout="responsive" className="rounded mt-4" />
          )
        }
        <button onClick={listNFTForSale} className="font-bold mt-4 bg-violet-600 text-white rounded p-4 shadow-lg">
          List NFT
        </button>
      </div>
    </div>
  )
}