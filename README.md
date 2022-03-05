# NFT Marketplace

This project shows how to implement a simple NFT marketplace on the Polygon Network (or any EVM compatible network). The on-chain logic is stored in `contracts/NFTMarketplace.sol`.

Necessary dependencies can be added by using

```shell
npm install
```

To initialize the local Hardhat network we use

```shell
npx hardhat node
```

Then we deploy the main Solidity on a separate terminal by running

```shell
npx hardhat run scripts/deploy.js --network localhost
```

To start the Next.js app on a localhost we run

```shell
npm run dev
```

Project based on [Nader Dabit tutorial](https://dev.to/dabit3/building-scalable-full-stack-apps-on-ethereum-with-polygon-2cfb)
