
import './Service.scss';

const ServicesSection = () => {
  return (
    <section className="services">
      <h2>Our Services</h2>
      <div className="service-list">
        <div className="service-item">
          <img src="/path/to/image1.jpg" alt="Service 1"/>
          <h3>Service 1</h3>
          <p>Description of Service 1.</p>
        </div>
        <div className="service-item">
          <img src="/path/to/image2.jpg" alt="Service 2"/>
          <h3>Service 2</h3>
          <p>Description of Service 2.</p>
        </div>
        <div className="service-item">
          <img src="/path/to/image3.jpg" alt="Service 3"/>
          <h3>Service 3</h3>
          <p>Description of Service 3.</p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
