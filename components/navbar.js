import Link from 'next/link'
import Image from 'next/image'

function Navbar(props) {
    return (
        <>
            <nav className="p-4 
            relative
            flex-wrap
            flex
            w-full
            items-center
            py-2
            lg:py-4
            navbar navbar-expand-lg navbar-light ">
                <div className="container-fluid w-full flex flex-wrap items-center mx-4 md:mx-6 lg:mx-20">
                    <Link href="/">
                        <a className="flex items-center">
                            <div className="w-8 h-15 xs:w-12 xs:h-20 md:w-20 md:h-36">
                                <Image src="/logo.svg" height={120} width={70} layout="responsive" alt="NFT Logo" />
                            </div>
                            <span className="flex self-center text-sm xs:text-lg md:text-2xl font-semibold text-violet-100 ml-3 mr-2 md:mr-6 w-28 md:w-30 xl:w-auto">Polygon Marketplace</span>
                        </a>
                    </Link>
                    <div className="order-1 lg:order-2 flex items-center ml-auto lg:ml-0">
                        {props.account == null ? (
                            <button type="button"
                                className="
                                text-violet-200
                                hover:text-violet-100 
                                bg-violet-700 
                                hover:bg-violet-600 
                                focus:ring-1 
                                focus:outline-none 
                                focus:ring-violet-300
                                rounded-lg  
                                font-medium 
                                text-xs xs:text-sm
                                text-center
                                px-2 py-2 xs:py-2.5 md:px-5 
                                mr-2 md:mr-3 transition duration-300 ease-in-out
                            "
                                onClick={e => props.connect(e)}
                            >
                                Connect Wallet
                            </button>
                        ) : (
                            <div className="text-violet-200
                            hover:text-violet-100 
                            bg-violet-700 
                            hover:bg-violet-600 
                            focus:ring-1 
                            focus:outline-none 
                            focus:ring-violet-300
                            rounded-lg  
                            font-medium 
                            text-sm
                            text-center
                            px-2 py-2.5 md:px-5 
                            mr-2 md:mr-3  transition duration-300 ease-in-out">
                                <a
                                    href={`https://mumbai.polygonscan.com/address//${props.account}`}
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    {`${props.account.slice(0, 10)}...`}
                                </a>
                            </div>
                        )}

                        <button type="button"
                            className="
                                navbar-toggler
                                text-violet-300
                                hover:text-violet-200 
                                border-0
                                hover:shadow-none hover:no-underline
                                py-2
                                px-0 xs:px-2.5
                                bg-transparent
                                focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline"
                            data-bs-toggle="collapse"
                            data-bs-target="#mobile-menu-1"
                            aria-controls="mobile-menu-1"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd">
                                </path>
                            </svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd">
                                </path>
                            </svg>
                        </button>
                    </div>

                    <div id="mobile-menu-1" className="collapse navbar-collapse flex justify-center items-center mt-4 md:mt-0 mr-0 lg:mr-6 lg:ml-auto order-2 lg:order-1" >
                        <ul className="navbar-nav flex pl-0 list-style-none">
                            <li className="nav-item px-2">
                                <Link href="/">
                                    <a className="mr-2 xs:mr-4 text-violet-300 transition duration-300 ease-in-out hover:text-violet-200">
                                        Home
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item pr-2">
                                <Link href="/explore">
                                    <a className="mr-2 xs:mr-4 text-violet-300 transition duration-300 ease-in-out hover:text-violet-200">
                                        Explore
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item pr-2">
                                <Link href="/mint-nft">
                                    <a className="mr-2 xs:mr-4 text-violet-300 transition duration-300 ease-in-out hover:text-violet-200">
                                        Mint NFT
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item pr-2">
                                <Link href="/my-nfts">
                                    <a className="text-violet-300 transition duration-300 ease-in-out hover:text-violet-200">
                                        My NFTs
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <hr className="hr" />
        </>
    )
}

export default Navbar
