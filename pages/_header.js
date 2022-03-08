import Link from 'next/link'
import Image from 'next/image'

function Header() {
    return(
        <nav className="border-b border-b-violet-300 p-4 ">
            <div className="flex place-content-between items-center mx-4 md:mx-6 lg:mx-20">
            <a href="#" className="flex items-center">
            <Image src="/logo.svg" height={120} width={70} class=" sm:h-10" alt="NFT Logo" />
            <span className="self-center text-2xl font-semibold text-violet-100 ml-3 mr-6 flex">Polygon Marketplace</span>
            </a>
            <div className="flex-nowrap gap-8">
            <Link href="/">
                <a className="mr-4 text-violet-300 transition duration-400 ease-in-out hover:text-violet-200">
                Home
                </a>
            </Link>
            <Link href="/mint-nft">
                <a className="mr-6 text-violet-300 transition duration-400 ease-in-out hover:text-violet-200">
                Mint NFT
                </a>
            </Link>
            <Link href="/my-nfts">
                <a className="mr-6 text-violet-300 transition duration-400 ease-in-out hover:text-violet-200">
                My NFTs
                </a>
            </Link>
            <Link href="/dashboard">
                <a className="text-violet-300 transition duration-400 ease-in-out hover:text-violet-200">
                Dashboard
                </a>
            </Link>
            </div>
            </div>
        </nav>
    )
}

export default Header
