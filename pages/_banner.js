import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import Lottie from 'react-lottie-player'

import lottieJson from '../public/data.json'

function Banner() {
    return(
        <div>
        <div className='px-10 py-20 grid grid-cols-6 items-center'>
            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                <div className="text-5xl md:text-4xl lg:text-5xl font-bold">
                    <p className='text-violet-100 mb-4'>+100 Unique NFT</p>
                    <p className='text-violet-300 mb-4'>Polygon Network</p>
                    <p className='text-violet-500 mb-4'>Layer 2 = Low Fees</p>  
                </div>
                <div className="text-2xl md:text-xl lg:text-2xl">
                    <p className='text-white'>Mint, buy and sell hundreds of NFTs on a fast network with low transaction fees.</p>
                </div>
            </div>    
            <div className="col-span-6 md:col-span-3 lg:col-span-3 flex justify-center md:justify-end">
                <Lottie 
                    loop
                    animationData={lottieJson}
                    play
                    style={{ width: 550, height: 550 }}
                />
            </div>
        </div>
        <hr className="hr"/>
        </div>
        
    )
}

export default Banner