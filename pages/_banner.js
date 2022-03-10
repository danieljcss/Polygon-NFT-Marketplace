import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import Lottie from 'react-lottie-player'

import lottieJson from '../public/data.json'

function Banner() {
    return(
        <div>
        <div className='px-10 py-20 grid grid-cols-3 items-center'>
            <div className="col-span-1">
                <div className="text-3xl font-bold">
                    <p className='text-violet-100 mb-2'>+100 Unique NFT</p>
                    <p className='text-violet-300 mb-2'>Polygon Network</p>
                    <p className='text-violet-500 mb-2'>Layer 2 = Low Fees</p>  
                </div>
                <div className="text-xl">
                    <p className='text-white'>Mint, buy and sell hundreds of NFTs on a fast network with low transaction fees.</p>
                </div>
            </div>    
            <div className="col-span-2 flex justify-end">
                <Lottie 
                    loop
                    animationData={lottieJson}
                    play
                    style={{ width: 500, height: 500 }}
                />
            </div>
        </div>
        <hr className="hr"/>
        </div>
        
    )
}

export default Banner