import '../styles/globals.css'
import Header from './_header'
import Footer from './_footer'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>NFT Marketplace</title>
    </Head>
    <body className="min-h-screen bg-gradient-to-tr from-dark-purple-900 via-dark-purple-700 to-dark-purple-900">
      <Header />
      <div className="mt-4 mb-10 mx-4 md:mx-6 lg:mx-20">
        <Component {...pageProps} />
      </div>
      <Footer />
    </body>
    </>
  )
}

export default MyApp