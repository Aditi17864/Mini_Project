import videoBg from "../assets/water.mp4";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero-container">

      <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoBg} type="video/mp4" />
      </video>

      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1>JalRakshak</h1>
        <p>Early Warning System for Water-Borne Diseases</p>
      </div>

    </section>
  );
}

export default Hero;