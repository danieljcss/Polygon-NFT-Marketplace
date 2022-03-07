import '../styles/globals.css'
import Link from 'next/link'
import Image from 'next/image'
import Header from './_header'
import Footer from './_footer'
import { Container } from 'postcss'

function MyApp({ Component, pageProps }) {
  return (
    <body className="min-h-screen bg-gradient-to-tr from-dark-purple-900 via-dark-purple-700 to-dark-purple-900">
      <Header />
      <div className="mt-4 mb-10 mx-4 md:mx-6 lg:mx-20">
        <Component {...pageProps} />
      </div>
      <Footer />
    </body>
  )
}

export default MyApp