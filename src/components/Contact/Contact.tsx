
import './Contact.scss';

const ContactSection = () => {
  return (
    <section className="contact">
      <h2>Contact Us</h2>
      <form>
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <textarea placeholder="Message" required></textarea>
        <button type="submit">Send</button>
      </form>
      <div className="contact-info">
        <p>Phone: 123-456-7890</p>
        <p>Email: info@vehiclerental.com</p>
        <p>Address: 123 Main St, City, Country</p>
      </div>
    </section>
  );
};

export default ContactSection;
