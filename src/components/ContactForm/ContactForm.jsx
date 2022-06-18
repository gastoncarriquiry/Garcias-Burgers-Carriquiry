import { useState } from "react";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    validInputs: {
      name: false,
      email: false,
      message: false,
    },
    errors: {
      name: "",
      email: "",
      message: "",
    },
    formError: "",
  });

  const handleChange = (evt) => {
    const handleForm = (field, isValid, message) => {
      switch (field) {
        case "name":
          setForm({
            ...form,
            name: evt.target.value,
            validInputs: { ...form.validInputs, name: isValid },
            errors: { ...form.errors, name: message },
          });
          break;
        case "email":
          setForm({
            ...form,
            email: evt.target.value,
            validInputs: { ...form.validInputs, email: isValid },
            errors: { ...form.errors, email: message },
          });
          break;
        case "message":
          setForm({
            ...form,
            message: evt.target.value,
            validInputs: { ...form.validInputs, message: isValid },
            errors: { ...form.errors, message: message },
          });
          break;
        default:
          break;
      }
    };
    switch (evt.target.id) {
      case "contact_name":
        if (evt.target.value === "") {
          handleForm("name", false, "❌ Este campo no puede quedar vacío.");
          evt.target.classList.add("invalid");
        } else {
          handleForm("name", true, "");
          evt.target.classList.remove("invalid");
        }
        break;
      case "contact_email":
        if (evt.target.value === "") {
          handleForm("email", false, "❌ Este campo no puede quedar vacío.");
          evt.target.classList.add("invalid");
        } else {
          handleForm("email", true, "");
          evt.target.classList.remove("invalid");
        }
        break;
      case "contact_message":
        if (evt.target.value === "") {
          handleForm("message", false, "❌ Este campo no puede quedar vacío.");
          evt.target.classList.add("invalid");
        } else {
          handleForm("message", true, "");
          evt.target.classList.remove("invalid");
        }
        break;
    }
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (Object.values(form.validInputs).includes(false)) {
      setForm({ ...form, formError: "❌ Algún campo quedó vacío." });
    } else {
      alert(
        "Tu mensaje fue enviado correctamente. Nos pondremos en contacto contigo a la brevedad."
      );
    }
  };
  return (
    <form>
      <h1>¡Contáctanos!</h1>
      <h3>
        Envíanos tu comentario, sugerencia o pregunta y nos pondremos en contacto contigo a la
        brevedad. Nos gustaría saber tu opinión.
      </h3>
      <FormInput
        type="text"
        onAction={handleChange}
        placeholder="Nombre"
        id="contact_name"
        value={form.name}
        errorText={form.errors.name}
        labelText="Nombre (*)"
      />
      <FormInput
        type="email"
        onAction={handleChange}
        placeholder="Ingrese su correo  electrónico. Ej.: ejemplo@correo.com"
        id="contact_email"
        value={form.email}
        errorText={form.errors.email}
        labelText="Correo Electrónico (*)"
      />
      <FormInput
        type="textarea"
        onAction={handleChange}
        placeholder="Ingrese su comentario, sugerencia o pregunta"
        id="contact_message"
        value={form.message}
        errorText={form.errors.message}
        labelText="Mensaje (*)"
      />
      <div id="submit">
        <Button type="submit" text="Enviar" click={handleSubmit} />
        <p className="error">{form.formError}</p>
      </div>
    </form>
  );
};

export default ContactForm;
