import { createContext, useContext } from "react";
import { ethers } from "ethers";
import Wenb3Model from "web3modal";
import { TicketingPlatformAddress, TicketingPlatformABI, CrowdFundingAddress, CrowdFundingABI } from "./constants";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const CrowdFundingContext = createContext();
export const useCrowdFundingContext = () => useContext(CrowdFundingContext);

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    CrowdFundingAddress,
    CrowdFundingABI,
    signerOrProvider
  );

const APIURL = "https://api.studio.thegraph.com/query/69527/creator_tribe/v0.0.2";

export const CrowdFundingContextProvider = ({ children }) => {

  const connectingWithSmartContract = async () => {
    try {
      const web3Modal = new Wenb3Model();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      return contract;
    } catch (error) {
      console.log("Something went wrong while connecting with contract!");
    }
  };

  const registerCreator = async (walletAddress, name, category, milestoneGoal) => {
    console.log("Hello")
    const contract = await connectingWithSmartContract();
    if (walletAddress) {
      await contract.registerCreator(name, category, milestoneGoal);
    }
  };

  const registerUser = async (walletAddress, name) => {
    const contract = await connectingWithSmartContract();
    if (walletAddress) {
      await contract.registerContributor(name);
    }
  };

  const getUser = async (address) => {
    console.log(address);
    if (address) {
      const query = `{
            userRegistereds(where: {userAddress: "${address}"}) {
              email
              id
              name
              userAddress
            }
          }`;

      console.log(query);
      const client = new ApolloClient({
        uri: APIURL,
        cache: new InMemoryCache(),
      });

      const res = await client.query({ query: gql(query) });
      console.log(res);
      if (res.data.userRegistereds.length === 0) {
        return null;
      }
      return res.data.userRegistereds[0];
    }
  };

  

  return (
    <CrowdFundingContext.Provider
      value={{
        registerUser,
        registerCreator,
        getUser
      }}
    >
      {children}
    </CrowdFundingContext.Provider>
  );
};
