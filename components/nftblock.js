import Image from 'next/image'
import { useState } from 'react'

export default function NFTBlock(props) {
    const [isLoading, setIsLoading] = useState(false)

    async function buyNft(e) {
        e.preventDefault()
        setIsLoading(true)
        await props.buyNft(e, props.nft)
        setIsLoading(false)
    }

    return (
        <div className="border border-violet-300 shadow hover:shadow-violet-100/50 hover:shadow-md rounded-xl overflow-hidden hover:scale-[1.01] transition duration-300 ease-in-out">
            <Image src={props.nft.image} alt="" width={500} height={500} layout="responsive" />

            <div className="p-4">
                <p style={{ overflow: 'hidden' }} className="h-14 mb-2 text-xl font-semibold text-violet-100">
                    {props.nft.name}
                </p>
                <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} className="h-6 text-violet-300">
                    {props.nft.description}
                </p>
            </div>

            <div className="p-4 bg-black grid grid-cols-10 items-center">
                <div className="col-span-8 items-center pr-3">
                    {isLoading ? (
                        <button disabled className="w-full bg-violet-600 text-white font-bold rounded py-2 px-12 transition-all ease-in-out duration-500">
                            <div className="spinner-border animate-spin
                                inline-block
                                w-5 h-5
                                border-4 rounded-full
                                text-violet-100
                                " role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </button>
                    ) : (
                        <button className="w-full bg-violet-600 text-white font-bold py-2 px-12 rounded" onClick={(e) => buyNft(e)}>Buy</button>
                    )}
                </div>

                <div className="col-span-2 items-center">
                    <div className="flex justify-end">
                        <p className="text-xs text-violet-200 mr">Price</p>
                    </div>
                    <div className="flex justify-end">
                        <Image src="/polygon-matic-logo.svg" alt="" height={16} width={16} />
                        <p className="font-semi-bold text-white ml-1">
                            {props.nft.price}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}