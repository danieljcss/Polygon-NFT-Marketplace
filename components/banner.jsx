import React from 'react'
import Lottie from 'react-lottie-player'

import lottieJson from '../public/data.json'

function Banner() {
    return (
        <div>
            <div className='px-5 pt-10 pb-10 sm:px-10 sm:pb-10 sm:pt-0 grid grid-cols-6 items-center'>
                <div className="col-span-6 md:col-span-3 lg:col-span-3 text-center sm:text-left">
                    <div className="text-3xl pt-0 sm:pt-14 xs:text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-bold">
                        <p className='text-violet-100 mb-2 sm:mb-4'>+100 Unique NFT</p>
                        <p className='text-violet-300 mb-2 sm:mb-4'>Polygon Network</p>
                        <p className='text-violet-500 mb-2 sm:mb-4'>Layer 2 = Low Fees</p>
                    </div>
                    <div className="text-xl sm:text-2xl md:text-xl lg:text-2xl">
                        <p className='text-white'>Mint, buy and sell hundreds of NFTs on a fast network with low transaction fees.</p>
                    </div>
                </div>
                <div className="col-span-6 md:col-span-3 lg:col-span-3 mr-4 sm:mr-0 flex justify-center md:justify-end">
                    <Lottie
                        loop
                        animationData={lottieJson}
                        play
                        style={{ width: 550 }}
                    />
                </div>
            </div>
            <hr className="hr" />
        </div>

    )
}

export default Banner