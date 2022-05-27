export async function changeNetwork() {
    try {
        if (!window.ethereum) throw new Error("No crypto wallet found")
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    chainId: `0x${Number(80001).toString(16)}`,
                    chainName: "Mumbai",
                    nativeCurrency: {
                        name: "MATIC",
                        symbol: "MATIC",
                        decimals: 18
                    },
                    rpcUrls: [`https://polygon-mumbai.infura.io/v3/${process.env.INFURA_ID}`,
                        "https://rpc-mumbai.maticvigil.com",
                        "https://matic-mumbai.chainstacklabs.com",
                        "https://matic-testnet-archive-rpc.bwarelabs.com"],
                    blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
                }
            ]
        })
    } catch (err) {
        console.log(err.message);
    }
}