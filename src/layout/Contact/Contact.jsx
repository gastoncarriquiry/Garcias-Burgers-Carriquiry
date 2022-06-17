import "./Contact.css";
import useDocumentTitle from "../../helpers/useDocumentTitle";
import ContactForm from "../../components/ContactForm/ContactForm";

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
