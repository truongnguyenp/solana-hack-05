import { Cluster } from '@solana/web3.js';

export const DEVNET_RPC_URL = "https://api.devnet.solana.com";
export const CLUSTER: Cluster = 'devnet';


export const supportedNFTs = [];

export const OFFERS = [
  {
    "currency": "pzSOL",
    "id": 1,
    "title": "NFT Tokens for PanzerdogNFTs",
    // "description:" "I can let you rentmy NFT for 1 day",
    "nftCollectionName": "Panzerdogcollection",
    "nftCollectionImg": "https://prod-image-cdn.tensor.trade/images/400x400/freeze=false/https://bafybeicxswb4nvoprcgm32qtglqrrdea32hndchwhggtjvqz7azza33kea.ipfs.nftstorage.link/",
    "maximumLending": 20,
    "interestRate": 10,
    "userImg": "https://pbs.twimg.com/media/EAG8lr6XkAA5ltJ.jpg",
    "userName": "Tony Stark",
  },
  {
    "id": 2,
    "title": "Famous Fox Federation NFTs",
    // "description:" "I can let you rentmy NFT for 1 day",
    "nftCollectionName": "Famous Fox Federation collection",
    "nftCollectionImg": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/famous_fox_federation_pfp_1679672949828.gif",
    "maximumLending": "50",
    "interestRate": "60",
    "userImg": "https://pm1.aminoapps.com/6874/6829d8215d0c64bf35e489a120a87e58f6b451eer1-372-442v2_uhq.jpg",
    "userName": "Steve Rogers",
    // "content": "Lending"
  },
  {
    "currency": "bSOL",
    "id": 3,
    "title": "NFT Tokens for Bonks NFTs",
    // "description:" "I can let you rentmy NFT for 1 day",
    "nftCollectionName": "Bonks collection",
    "nftCollectionImg": "https://prod-image-cdn.tensor.trade/images/400x400/freeze=false/https://creator-hub-prod.s3.us-east-2.amazonaws.com/bonkznft_pfp_1675111749066.png",
    "maximumLending": "40",
    "interestRate": "40",
    "userImg": "https://i.pinimg.com/originals/48/1c/dc/481cdcac403956bed3c24e56da0595b9.jpg",
    "userName": "Carol Danvers",
    // "content": "Lending"
  },
]
export const ELUSIV_KEY = "THIS_IS_A_ELUSIV_KEY";