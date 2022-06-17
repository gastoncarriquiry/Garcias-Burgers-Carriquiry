import FormInput from "../../components/FormInput/FormInput";
import Button from "../../components/Button/Button";
import { useState } from "react";

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
    switch (evt.target.id) {
      case "contact_name":
        if (evt.target.value === "") {
          setForm({
            ...form,
            name: evt.target.value,
            validInputs: { ...form.validInputs, name: false },
            errors: { ...form.errors, name: "❌ Este campo no puede quedar vacío." },
          });
          evt.target.classList.add("invalid");
        } else {
          setForm({
            ...form,
            name: evt.target.value,
            validInputs: { ...form.validInputs, name: true },
            errors: { ...form.errors, name: "" },
          });
          evt.target.classList.remove("invalid");
        }
        break;
      case "contact_email":
        if (evt.target.value === "") {
          setForm({
            ...form,
            email: evt.target.value,
            validInputs: { ...form.validInputs, email: false },
            errors: { ...form.errors, email: "❌ Este campo no puede quedar vacío." },
          });
          evt.target.classList.add("invalid");
        } else {
          setForm({
            ...form,
            email: evt.target.value,
            validInputs: { ...form.validInputs, email: true },
            errors: { ...form.errors, email: "" },
          });
          evt.target.classList.remove("invalid");
        }
        break;
      case "contact_message":
        if (evt.target.value === "") {
          setForm({
            ...form,
            message: evt.target.value,
            validInputs: { ...form.validInputs, message: false },
            errors: { ...form.errors, message: "❌ Este campo no puede quedar vacío." },
          });
          evt.target.classList.add("invalid");
        } else {
          setForm({
            ...form,
            message: evt.target.value,
            validInputs: { ...form.validInputs, message: true },
            errors: { ...form.errors, message: "" },
          });
          evt.target.classList.remove("invalid");
        }
        break;
    }
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(form.validInputs);
    if (Object.values(form.validInputs).includes(false)) {
      setForm({ ...form, formError: "❌ Algún campo quedó vacío." });
    } else {
      console.log("Se envía el mensaje.");
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
