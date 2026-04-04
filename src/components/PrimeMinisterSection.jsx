import "./PrimeMinisterSection.css";
import pm from "../assets/modi.png";

function PrimeMinisterSection() {
  return (
    <section className="pm-section">

      <h2 className="pm-title">
         Prime Minister's Opinion 
      </h2>

      <div className="pm-container">

        {/* LEFT IMAGE */}

        <div className="pm-image">
          <img src={pm} alt="Prime Minister"/>
        </div>

        {/* RIGHT TEXT */}

        <div className="pm-content">

          <p className="pm-quote">
          “India’s development and self-reliance is dependent on
          water security and water connectivity.”
          </p>

        </div>

      </div>

    </section>
  );
}

export default PrimeMinisterSection;