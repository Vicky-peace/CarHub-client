
import './Aboutus.scss';
import carImage from '../../assets/images/car image.webp';
import signatureImage from '../../assets/images/car image.webp';

const About = () => {
    return (
      <section className="about">
        <div className="about-content">
          <img src={carImage} alt="Car" className="about-image" />
          <div className="about-text">
            <h2>About Us</h2>
            <h3>Feel The Best Experience With Our Rental Deals</h3>
            <p>Experience a hassle-free car rental service offering high-quality vehicles and customer-focused service. Whether you're traveling for business or pleasure, our diverse fleet of cars and exceptional customer support ensure a seamless rental experience. Our commitment to excellence has earned us thousands of satisfied clients worldwide.</p>
            <p>Join us for a comfortable, reliable, and affordable ride.</p>
            <p className="signature">Thomas Jack</p>
            <img src={signatureImage} alt="Signature" className="signature-image" />
          </div>
        </div>
      <div className="about-stats">
        <div className="stat-item">
          <h4>4784+</h4>
          <p>Happy Clients</p>
        </div>
        <div className="stat-item">
          <h4>5174+</h4>
          <p>Cup of Coffee</p>
        </div>
        <div className="stat-item">
          <h4>7894+</h4>
          <p>Car Rented</p>
        </div>
        <div className="stat-item">
          <h4>9874+</h4>
          <p>World Wide Clients</p>
        </div>
      </div>
    </section>
  );
};

export default About;
