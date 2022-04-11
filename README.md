# ![Alt text](public/logo.svg?raw=true "Logo") Polygon NFT Marketplace

This project shows how to implement a simple NFT marketplace on the Polygon Network (or any EVM compatible network). The on-chain logic is stored in `contracts/NFTMarketplace.sol`.

## Initialization

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

## Deploy on Vercel

This Next.js app can be deployed for free using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## Technologies used

- Node.js: Backend and server
- React.js: a component based JavaScript Framework
- Next.js: React Framework for production
- Tailwind: CSS styling
- Solidity: Smart contracts language
- Hardat: Deployement and testing of smart contracts (+ waffle and chai)
- Ethers.js: Web3 provider for JavaScript

Project based on a Nader Dabit tutorial
