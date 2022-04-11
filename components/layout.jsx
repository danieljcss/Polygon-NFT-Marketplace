import Navbar from './navbar'
import Footer from './footer'
import Head from 'next/head'

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>NFT Marketplace</title>
      </Head>
      <Navbar account={props.account} connect={props.connect} />
      <main>
        {props.children}
      </main>
      <Footer />
    </>
  )
}