
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: { version: "0.8.17", settings: { optimizer: { enabled: true, runs: 200 } }},
	paths: {
		artifacts: "./src/artifacts",
	},
	networks: {
		hardhat: {
			chainId: 1337,
		},
		polygon_amoy: {
			url: `https://rpc-amoy.polygon.technology/`, // enter polygon alchemy rpcURL here
			accounts: ["fe81a0bcb15dcd6d435d3c9f121656b02e83d19aa4087d72e7ad1e0f1fad13ab"], // add admin's private key in this
			chainId: 80002,
			allowUnlimitedContractSize: true,
		},
	},
};
