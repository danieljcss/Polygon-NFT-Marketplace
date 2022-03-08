import Link from 'next/link'
import Image from 'next/image'

function Banner() {
    return(
        <div className='px-10 py-20 grid grid-cols-3'>
            <div className="col-span-1">
                <div className="text-3xl font-bold">
                    <p className='text-violet-100 mb-2'>+100 Unique NFT</p>
                    <p className='text-violet-300 mb-2'>Polygon Network</p>
                    <p className='text-violet-500 mb-2'>Layer 2 = Low Fees</p>  
                </div>
                <div className="text-xl">
                    <p className='text-white'>Create, buy and sell hundreds of NFTs on a fast network with low transaction fees.</p>
                </div>
            </div>    
            <div className="col-span-2">
                <Image src="https://s.com" alt=""/>
            </div>
        </div>
    )
}

export default Banner