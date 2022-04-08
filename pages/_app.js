import '../styles/globals.css'
import Layout from '../components/layout'
import { useState, useEffect } from 'react'
import { web3Connect, web3Load } from '../components/utils/web3Connect'

function MyApp({ Component, pageProps }) {
  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)
  const [contract, setContract] = useState(null)

  useEffect(() => {
    import('tw-elements')
    init()
  }, [])

  async function init() {
    const connect = await web3Load()
    setProvider(connect.provider)
    setContract(connect.contract)
    if (typeof connect.account != "undefined") {
      setAccount(connect.account)
    }
  }

  async function connect(e) {
    e.preventDefault()
    const connect = await web3Connect()
    setAccount(connect.account)
    setProvider(connect.provider)
    setContract(connect.contract)
  }

  return (
    <Layout account={account} connect={connect}>
      <div className="mt-4 mb-10 mx-4 md:mx-6 lg:mx-20">
        <Component
          {...pageProps}
          account={account}
          provider={provider}
          contract={contract}
          connect={connect} />
      </div>
    </Layout>
  )
}

export default MyApp