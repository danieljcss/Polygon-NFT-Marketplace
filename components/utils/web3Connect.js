import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import contractJson from '../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
import { marketplaceAddress } from '../../config'

export async function web3Connect() {
    const providerOptions = {}
    const web3Modal = new Web3Modal({
        network: 'mumbai',
        cacheProvider: true,
        providerOptions
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketplaceAddress, contractJson.abi, signer)
    const account = await signer.getAddress()
    return { contract: contract, provider: provider, account: account }
}

export async function web3Load() {
    // Connect to Metamask provider if injected to the right network
    let hasRightnetwork;
    if (window.ethereum !== undefined) {
        if (window.ethereum.networkVersion == '80001') {
            hasRightnetwork = true
        }
        else hasRightnetwork = false
    } else {
        hasRightnetwork = false
    }

    if (hasRightnetwork) {
        const providerTest = new ethers.providers.Web3Provider(window.ethereum)
        const accountsTest = await providerTest.listAccounts()

        if (accountsTest.length > 0) {
            return web3Connect()
        } else {
            const contract = new ethers.Contract(marketplaceAddress, contractJson.abi, providerTest)

            return { contract: contract, provider: providerTest }
        }
    }
    // Otherwise connect to Mumbai RPC (for users without Metamask)
    else {
        const providerRPC = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.infura.io/v3/${process.env.INFURA_ID}`)
        const contract = new ethers.Contract(marketplaceAddress, contractJson.abi, providerRPC)

        return { contract: contract, provider: providerRPC }
    }
}