import '../styles/globals.css'
import Layout from '../components/layout'
import { useState, useEffect } from 'react'
import { web3Connect, web3Load } from '../components/utils/web3Connect'
import {changeNetwork} from '../components/utils/changeNetwork'

function MyApp({ Component, pageProps }) {
  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)
  const [contract, setContract] = useState(null)

  useEffect(() => {
    import('tw-elements')
    init()
  }, [])

  // Connects by Default
  async function init() {
    const connect = await web3Load()
    setProvider(connect.provider)
    setContract(connect.contract)
    if (typeof connect.account != "undefined") {
      setAccount(connect.account)
    }
  }

  // Connects to Metamask if not done yet
  async function connect(e) {
    e.preventDefault()
    await changeNetwork()
    let connect
    try {
      connect = await web3Connect()
      setAccount(connect.account)
      setProvider(connect.provider)
      setContract(connect.contract)
    } catch (error) {
      console.log('Wallet connection failed: ', error)
    }
    return (connect)
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