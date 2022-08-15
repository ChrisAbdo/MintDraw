import React from "react";
import Navbar from "../components/HomeNav";
import HomeHero from "../components/HomeHero";

const Home = ({ Web3Handler, account }) => {
  return (
    <>
      <Navbar account={account} />
      <HomeHero Web3Handler={Web3Handler} />
    </>
  );
};

export default Home;
