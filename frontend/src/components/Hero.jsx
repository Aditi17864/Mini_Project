import React from "react";
import videoBg from "../assets/water.mp4";

function Hero() {
  return (
    <div className="hero">

      <video autoPlay loop muted playsInline className="video-bg">
        <source src={videoBg} type="video/mp4" />
      </video>

      <div className="hero-content">

        <h1>
          JalRakshak
        </h1>

        <p>
          Early Warning System for Water-Borne Diseases
        </p>

      </div>

    </div>

  );
}

export default Hero;