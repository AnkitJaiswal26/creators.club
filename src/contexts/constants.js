import CrowdFunding from "../artifacts/contracts/CrowdFunding.sol/CrowdFunding.json";

export const CrowdFundingAddress =
  "0x91aC5B43df6856316Dfc203922b4d0c9DacFA48c";
export const CrowdFundingABI = CrowdFunding.abi;

export const ChainId = {
  MAINNET: 1,
  GOERLI: 5,
  POLYGON_MUMBAI: 80001,
  POLYGON_MAINNET: 137,
  SCROLL: 534353,
  OP_AVAIL_SEPOLIA: 202402021700,
};

export let activeChainId = ChainId.OP_AVAIL_SEPOLIA;
export const supportedChains = [
  ChainId.GOERLI,
  ChainId.POLYGON_MAINNET,
  ChainId.POLYGON_MUMBAI,
  ChainId.SCROLL,
  ChainId.OP_AVAIL_SEPOLIA,
];
