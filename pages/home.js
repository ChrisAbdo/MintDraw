import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

const Home = ({ Web3Handler, account }) => {
  return (
    <>
      <Navbar account={account} />
      <Hero Web3Handler={Web3Handler} />
    </>
  );
};

export default Home;
