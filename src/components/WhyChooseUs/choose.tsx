
import './choose.scss';
import supportIcon from '../../assets/images/dashboard.png'; // Replace with actual icon path
import mobileIcon from '../../assets/images/dashboard.png'; // Replace with actual icon path
import businessIcon from '../../assets/images/dashboard.png'; // Replace with actual icon path
import salesIcon from '../../assets/images/dashboard.png'; // Replace with actual icon path

const WhyChoose = () => {
  return (
    <section className="why-choose">
      <h2>Why Choose Our Platform</h2>
      <div className="features">
        <div className="feature">
          <img src={supportIcon} alt="Customer Support" />
          <h3>Customer Support</h3>
          <p>Our support team is at your service 24/7, ready to assist you whenever you need it.</p>
        </div>
        <div className="feature">
          <img src={mobileIcon} alt="Premium Mobile Solution" />
          <h3>Premium Mobile Solution</h3>
          <p>Make a reservation, inspect your car, and overview your business while having coffee.</p>
        </div>
        <div className="feature">
          <img src={businessIcon} alt="Focus on your business" />
          <h3>Focus on your business</h3>
          <p>Direct your full attention to your business operations while we efficiently handle all your technical requirements.</p>
        </div>
        <div className="feature">
          <img src={salesIcon} alt="Boost your sales" />
          <h3>Boost your sales</h3>
          <p>Boost your direct sales and reduce your broker fees with our fully managed booking engine.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
