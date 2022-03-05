import '../styles/globals.css'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <div className="h-screen w-screen bg-gradient-to-tr from-dark-purple-900 via-dark-purple-700 to-dark-purple-900">
      <div className="text-4xl pt-6 font-bold text-violet-100 flex justify-center">NFT Marketplace</div>
      <nav className="border-b p-6">
        <div className="flex mt-4 justify-center gap-8">
          <Link href="/">
            <a className="mr-4 text-violet-300">
              Home
            </a>
          </Link>
          <Link href="/create-nft">
            <a className="mr-6 text-violet-300">
              Sell NFT
            </a>
          </Link>
          <Link href="/my-nfts">
            <a className="mr-6 text-violet-300">
              My NFTs
            </a>
          </Link>
          <Link href="/dashboard">
            <a className="mr-6 text-violet-300">
              Dashboard
            </a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp