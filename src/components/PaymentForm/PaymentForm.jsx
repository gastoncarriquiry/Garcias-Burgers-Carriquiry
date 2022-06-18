import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { useCartContext } from "../../context/CartContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Button from "../Button/Button";
import FormInput from "../FormInput/FormInput";
import FormTabs from "../FormTabs/FormTabs";
import OrderEmpty from "../OrderEmpty/OrderEmpty";
import OrderSuccess from "../OrderSuccess/OrderSuccess";
import "./PaymentForm.css";

const PaymentForm = () => {
  useDocumentTitle("Pago | García's Burgers");
  const { cartList, getTotal, totalPrice, clearCart } = useCartContext();
  const [isDelivery, setIsDelivery] = useState(true);
  const [lastEvent, setLastEvent] = useState();
  const [form, setForm] = useState({
    name: "",
    email: "",
    emailVerify: "",
    phone: "",
    address1: "",
    address2: "",
    comment: "",
    validInputs: {
      name: false,
      email: false,
      emailVerify: false,
      phone: false,
      address1: false,
    },
    errors: {
      name: "",
      email: "",
      emailVerify: "",
      phone: "",
      address1: "",
    },
  });
  let formValid = false;
  const [formError, setFormError] = useState("");
  const delivery = useRef(null);
  const [orderSent, setOrderSent] = useState(false);
  const [orderRef, setOrderRef] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const generateOrder = (evt) => {
    evt.preventDefault();

    if (Object.values(form.validInputs).includes(false) === true) {
      formValid = false;
    } else {
      formValid = true;
    }

    if (formValid === true) {
      setFormError("");
      setLoading(true);
      evt.target.setAttribute("disabled", true);
      setOrderSent(true);
      let order = {};
      order.buyer = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: isDelivery
          ? form.address2 !== ""
            ? `${form.address1} esq. ${form.address2}`
            : form.address1
          : "S/D - takeaway",
      };
      order.comment = form.comment;
      order.type = isDelivery ? "delivery" : "takeaway";
      order.total = getTotal();
      order.date = new Date();
      order.items = cartList.map((item) => {
        const id = item.id;
        const product = item.title;
        const price = totalPrice(item.price, item.quantity, item.extrasPrice);
        const quantity = item.quantity;
        const extras =
          item.extrasSelected !== undefined ? item.extrasSelected.map((extra) => extra.ref) : null;
        const comment = item.comment;

        if (item.comment && item.extrasSelected !== undefined && item.extrasSelected.length > 0) {
          return { id, product, price, quantity, extras, comment };
        } else if (item.comment) {
          return { id, product, price, quantity, comment };
        } else if (item.extrasSelected !== undefined && item.extrasSelected.length > 0) {
          return { id, product, price, quantity, extras };
        } else {
          return { id, product, price, quantity };
        }
      });

      // CREATE ORDER
      const db = getFirestore();
      const queryCollection = collection(db, "orders");
      addDoc(queryCollection, order)
        .then((res) => setOrderRef(res.id))
        .catch((err) => console.error(err))
        .finally(() => {
          clearCart();
          formValid = false;
          setLoading(false);
        });
    } else {
      setFormError("❌ Asegúrese que todos los campos sean correctos.");
      setTimeout(() => {
        setFormError("");
      }, 5000);
    }
  };

  useEffect(() => setLastEvent(delivery.current), []);

  const handleOnClick = (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains("active")) {
      setLastEvent(evt.target);
    } else {
      lastEvent.classList.remove("active");
      evt.target.classList.add("active");
      setIsDelivery(!isDelivery);
      setLastEvent(evt.target);
    }

    if (isDelivery) {
      setForm({ ...form, validInputs: { ...form.validInputs, address1: true } });
    } else {
      setForm({ ...form, validInputs: { ...form.validInputs, address1: false } });
    }
  };

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
        case "emailVerify":
          setForm({
            ...form,
            emailVerify: evt.target.value,
            validInputs: { ...form.validInputs, emailVerify: isValid },
            errors: { ...form.errors, emailVerify: message },
          });
          break;
        case "phone":
          setForm({
            ...form,
            phone: evt.target.value,
            validInputs: { ...form.validInputs, phone: isValid },
            errors: { ...form.errors, phone: message },
          });
          break;
        case "address1":
          setForm({
            ...form,
            address1: evt.target.value,
            validInputs: { ...form.validInputs, address1: isValid },
            errors: { ...form.errors, address1: message },
          });
          break;
        default:
          break;
      }
    };
    const handleErrors = (add, remove) => {
      evt.target.classList.add(add);
      evt.target.classList.remove(remove);
    };
    switch (evt.target.id) {
      case "inp_nombre":
        if (isNaN(evt.key) || evt.key === " ") {
          if (evt.target.value !== "") {
            handleForm("name", true, "");
            handleErrors("valid", "invalid");
          } else {
            handleForm("name", false, "❌ Este campo no puede quedar vacío.");
            handleErrors("invalid", "valid");
          }
        } else {
          handleForm("name", false, "❌ Asegúrese de ingresar letras únicamente.");
          handleErrors("invalid", "valid");
        }
        break;
      case "inp_email":
        const regExpEmail = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
        if (evt.target.value !== "") {
          if (regExpEmail.test(evt.target.value)) {
            handleForm("email", true, "");
            handleErrors("valid", "invalid");
          } else {
            handleForm(
              "email",
              false,
              "❌ El correo ingresado no es correcto. Ej: garciasburger@gmail.com"
            );
            handleErrors("invalid", "valid");
          }
        } else {
          handleForm("email", false, "❌ Este campo no puede quedar vacío.");
          handleErrors("invalid", "valid");
        }
        break;
      case "inp_emailVerify":
        if (evt.target.value !== "") {
          if (evt.target.value === form.email) {
            handleForm("emailVerify", true, "");
            handleErrors("valid", "ivalid");
          } else {
            handleForm("emailVerify", false, "❌ El correo ingresado no coincide con el primero.");
            handleErrors("invalid", "valid");
          }
        } else {
          handleForm("emailVerify", false, "❌ Este campo no puede quedar vacío.");
          handleErrors("invalid", "valid");
        }
        break;
      case "inp_phone":
        const regExpPhone =
          /^((09[1-9](\s?)([0-9]{3})(\s?)([0-9]{3}))|((2|4)(\s?)([0-9]{3})(\s?)([0-9]{2})(\s?)([0-9]{2})))$/g;
        if (evt.target.value !== "") {
          if (!isNaN(evt.key) || evt.key === undefined || evt.key === "Tab") {
            if (regExpPhone.test(evt.target.value)) {
              handleForm("phone", true, "");
              handleErrors("valid", "ivalid");
            } else {
              handleForm(
                "phone",
                false,
                "❌ Formato de teléfono inválido. Ejemplos de formatos aceptados: 098 075 725 (móvil) o 2603 4394 (fijo)."
              );
              handleErrors("invalid", "valid");
            }
          } else {
            handleForm("phone", false, "❌ Asegúrese de ingresar números únicamente.");
            handleErrors("invalid", "valid");
          }
        } else {
          handleForm("phone", false, "❌ Este campo no puede quedar vacío.");
          handleErrors("invalid", "valid");
        }
        break;
      case "inp_address1":
        if (evt.target.value !== "") {
          if (/\d/.test(evt.target.value)) {
            handleForm("address1", true, "");
            handleErrors("valid", "ivalid");
          } else {
            handleForm("address1", false, "❌ Por favor incluya el número de puerta.");
            handleErrors("invalid", "valid");
          }
        } else {
          handleForm("address1", false, "❌ Este campo no puede quedar vacío.");
          handleErrors("invalid", "valid");
        }
        break;
      case "inp_address2":
        setForm({ ...form, address2: evt.target.value });
        break;
      case "inp_comment":
        setForm({ ...form, comment: evt.target.value });
        break;
      default:
        break;
    }
  };

  return (
    <section className="payment-form">
      {cartList.length > 0 ? (
        <form>
          <FormTabs reference={delivery} action={handleOnClick} />
          <fieldset>
            <FormInput
              type="text"
              id="inp_nombre"
              placeholder="Nombre y Apellido"
              value={form.name}
              onAction={handleChange}
              errorText={form.errors.name}
              labelText="Nombre Completo"
            />
            <FormInput
              type="email"
              id="inp_email"
              placeholder="ejemplo@correo.com"
              value={form.email}
              onAction={handleChange}
              errorText={form.errors.email}
              labelText="Correo Electrónico"
            />
            <FormInput
              type="email"
              id="inp_emailVerify"
              placeholder="Ingrese de nuevo su correo"
              value={form.emailVerify}
              onAction={handleChange}
              errorText={form.errors.emailVerify}
              labelText="Repetir Correo Electrónico"
            />
            <FormInput
              type="tel"
              id="inp_phone"
              placeholder="Ej.: 098 075 725 o 2603 4394"
              value={form.phone}
              onAction={handleChange}
              errorText={form.errors.phone}
              labelText="Teléfono/Celular"
            />
            {isDelivery ? (
              <div className="address-cont">
                <FormInput
                  type="text"
                  id="inp_address1"
                  placeholder="Ej.: Mariano Uriarte 6300"
                  value={form.address1}
                  onAction={handleChange}
                  errorText={form.errors.address1}
                  labelText="Dirección"
                />
                <FormInput
                  type="text"
                  id="inp_address2"
                  placeholder="Ej.: Córcega"
                  value={form.address2}
                  onAction={handleChange}
                  labelText="Esquina (esq.)"
                />
                <FormInput
                  type="textarea"
                  id="inp_comment"
                  placeholder="Comentarios o aclaraciones"
                  value={form.comment}
                  onAction={handleChange}
                  labelText="Comentarios sobre la entrega"
                />
              </div>
            ) : (
              <div className="takeaway-info">
                <p>
                  Nuestro local se encuentra en Mariano Uriarte 6300 esq. Córcega. Estamos abiertos:
                </p>
                <ul>
                  <li>Lunes a jueves: 11:30 - 15:00 y 19:30 - 23:00</li>
                  <li>Viernes: 11:30 - 15:00 y 19:30 - 00:00</li>
                  <li>Sábado: 19:30 - 00:00</li>
                  <li>Domingo: 19:00 - 23:00</li>
                </ul>
              </div>
            )}
            <div className="submit">
              {loading ? <Loader /> : <></>}
              <Button type="submit" text="Enviar Pedido" click={(evt) => generateOrder(evt)} />
              <p className="error">{formError}</p>
            </div>
          </fieldset>
        </form>
      ) : orderSent ? (
        <OrderSuccess orderReference={orderRef} action={() => setOrderSent(false)} />
      ) : (
        <OrderEmpty />
      )}
    </section>
  );
};

export default PaymentForm;
