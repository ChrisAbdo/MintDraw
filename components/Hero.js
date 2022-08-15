import React from "react";

const Hero = ({ Web3Handler }) => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="container mx-auto px-24">
        <h1 className="h-96 animate-bounce">Scroll through me!</h1>
      </div>
      <div className="hero-content flex-col lg:flex-row">
        <div className="h-96 carousel carousel-vertical rounded-box">
          <div className="carousel-item h-full">
            <img src="/dragon.jpg" />
          </div>
          <div className="carousel-item h-full">
            <img src="/patrick.png" />
          </div>
          <div className="carousel-item h-full">
            <img src="/stitch.png" />
          </div>
          <div className="carousel-item h-full">
            <img src="/spidey.jpg" />
          </div>
          <div className="carousel-item h-full">
            <img src="/amongus.jpg" />
          </div>
          <div className="carousel-item h-full">
            <img src="/squid.jpg" />
          </div>
        </div>
        <div>
          <h1 className="text-5xl font-bold">Welcome to MintDraw🌿</h1>
          <p className="py-6 text-2xl">
            Create pixel art and mint it directly to the Ethereum blockchain!
          </p>
          <button className="btn btn-primary" onClick={Web3Handler}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
