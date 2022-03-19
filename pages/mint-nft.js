import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Web3Modal from 'web3modal'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
  marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()

  async function onChange(e) {
    /* upload image to IPFS */
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  async function uploadToIPFS() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* TODO: Handle Error empty field */
    /* first, upload metadata to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after metadata is uploaded to IPFS, return the URL to use it in the transaction */
      return url
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function listNFTForSale() {
    const url = await uploadToIPFS()
    const web3Modal = new Web3Modal() 
    try {
      const connection = await web3Modal.connect() /* TODO: Resolve promise when failed to connect to wallet*/
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
    } catch (error) {
      console.log('Wallet connection failed: ', error)
    }

    /* Mint NFT */
    try {
      const price = ethers.utils.parseUnits(formInput.price, 'ether')
      let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
      let listingPrice = await contract.getListingPrice()
      listingPrice = listingPrice.toString()
      let transaction = await contract.createToken(url, price, { value: listingPrice })
      await transaction.wait()

      router.push('/')
    } catch (error) {
      console.log('Price must be bigger than 0: ', error)
    }
    
  }

  return (
    <form className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input 
          placeholder="Asset Name"
          className="mt-8 border rounded p-4 text-violet-200 border-white/20 bg-white/20
            placeholder:text-violet-300
            focus:outline-none focus:border-violet-200 focus:ring-1 focus:ring-violet-500"
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4 text-violet-200 border-white/20 bg-white/20
          placeholder:text-violet-300
          focus:outline-none focus:border-violet-200 focus:ring-1 focus:ring-violet-500"
          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
          required
        />
        <input
          placeholder="Asset Price in MATIC"
          type="number" step="0.01" min="0"
          className="mt-2 border rounded p-4 text-violet-200 border-white/20 bg-white/20
          placeholder:text-violet-300
          focus:outline-none focus:border-violet-200 focus:ring-1 focus:ring-violet-500"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
          required
        />
        <input
          type="file"
          name="Asset"
          accept=".jpeg, .png, .webp, .jpg, .svg, .gif"
          className="my-4 text-violet-200 rounded
            file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100"
          onChange={onChange}
          required
        />
        {
          fileUrl && (
            <Image src={fileUrl} alt="" width={400} height={400} layout='responsive' className="rounded mt-4 mx-auto" />
          )
        }
        <button onClick={listNFTForSale} className="font-bold mt-4 bg-violet-600 text-white rounded p-4 shadow-lg
        hover:bg-violet-700 transition-all ease-in-out duration-500">
          Create NFT
        </button>
      </div>
    </form>
  )
}