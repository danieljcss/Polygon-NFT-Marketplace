import Link from 'next/link'
import Image from 'next/image'

function Navbar() {
    return(
        <>
        <nav className="p-4 ">
            <div className="flex place-content-between items-center mx-4 md:mx-6 lg:mx-20">
            <Link href="/">
                <a className="flex items-center">
                    <Image src="/logo.svg" height={120} width={70} className="sm:h-10" alt="NFT Logo" />
                    <span className="self-center text-2xl font-semibold text-violet-100 ml-3 mr-6 flex">Polygon Marketplace</span>
                </a>
            </Link>
            <div className="flex-nowrap gap-8">
            <Link href="/">
                <a className="mr-4 text-violet-300 transition duration-400 ease-in-out hover:text-violet-200">
                Home
                </a>
            </Link>
            <Link href="/explore">
                <a className="mr-6 text-violet-300 transition duration-400 ease-in-out hover:text-violet-200">
                Explore
                </a>
            </Link>
            <Link href="/mint-nft">
                <a className="mr-6 text-violet-300 transition duration-400 ease-in-out hover:text-violet-200">
                Mint NFT
                </a>
            </Link>
            <Link href="/my-nfts">
                <a className="text-violet-300 transition duration-400 ease-in-out hover:text-violet-200">
                My NFTs
                </a>
            </Link>
            
            </div>
            </div>
        </nav>
        <hr className="hr"/>
        </>
    )
}

export default Navbar
