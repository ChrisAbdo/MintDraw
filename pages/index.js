// Import Next.js / React dependencies
import Head from "next/head";
import { useState, useEffect } from "react";

// Import components
import Navbar from "../components/Navbar";

// Import external dependencies
import Web3 from "web3";

const Home = () => {
  // Initialize state variables
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  // Initialize blockchain data from ABIs
  const loadBlockchainData = async () => {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);

      const accounts = await web3.eth.getAccounts();

      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }

      const networkId = await web3.eth.net.getId();

      // Event listeners...
      window.ethereum.on("accountsChanged", function (accounts) {
        setAccount(accounts[0]);
      });

      window.ethereum.on("chainChanged", (chainId) => {
        window.location.reload();
      });
    }
  };

  // Enable metamask connection
  const Web3Handler = async () => {
    if (web3) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    }
  };

  useEffect(() => {
    loadBlockchainData();
  }, [account]);

  return (
    <>
      <Head>
        <title>MintDraw🌿</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar account={account} Web3Handler={Web3Handler} />
    </>
  );
};

export default Home;
