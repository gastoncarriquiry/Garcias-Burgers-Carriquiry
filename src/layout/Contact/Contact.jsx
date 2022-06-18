import ContactForm from "../../components/ContactForm/ContactForm";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import "./Contact.css";

const Contact = () => {
  useDocumentTitle("Contacto | García's Burgers");

  return (
    <main className="contact">
      <div className="cont">
        <ContactForm />
      </div>
    </main>
  );
};

export default Contact;
