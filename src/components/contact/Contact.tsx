import { useState } from "react";
import "./Contact.scss";

const ContactForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button className="open-modal-btn" onClick={openModal}>
        Contact Us
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal-btn" onClick={closeModal}>
              &times;
            </button>
            <form className="contact-form">
              <h2>Contact Us</h2>
              <label>
                Name
                <input type="text" name="name" required autoFocus />
              </label>
              <label>
                Email
                <input type="email" name="email" required />
              </label>
              <label>
                Message
                <textarea name="message" required></textarea>
              </label>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
