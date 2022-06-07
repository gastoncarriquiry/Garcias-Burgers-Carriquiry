import { useCartContext } from "../../context/CartContext";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import Button from "../Button/Button";
import useDocumentTitle from "../../helpers/useDocumentTitle";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import FormInput from "../FormInput/FormInput";

const PaymentForm = () => {
  useDocumentTitle("Pago | García's Burgers");
  const { cartList, getTotal, totalPrice, clearCart } = useCartContext();
  const [isDelivery, setIsDelivery] = useState(true);
  const [lastEvent, setLastEvent] = useState();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    comment: "",
    validInputs: {
      name: false,
      email: false,
      phone: false,
      address1: false,
    },
    errors: {
      name: "",
      email: "",
      phone: "",
      address1: "",
    },
  });
  const [formValid, setFormValid] = useState(false);
  const delivery = useRef(null);
  const [orderSent, setOrderSent] = useState(false);
  const [orderRef, setOrderRef] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const generateOrder = (evt) => {
    evt.preventDefault();
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
        setLoading(false);
      });
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
    switch (evt.target.id) {
      case "inp_nombre":
        if (isNaN(evt.key)) {
          if (evt.target.value !== "") {
            setForm({
              ...form,
              name: evt.target.value,
              validInputs: { ...form.validInputs, name: true },
              errors: { ...form.errors, name: "" },
            });
          } else {
            setForm({
              ...form,
              name: evt.target.value,
              validInputs: { ...form.validInputs, name: false },
              errors: { ...form.errors, name: "Este campo no puede quedar vacío." },
            });
          }
        } else {
          setForm({
            ...form,
            name: evt.target.value,
            validInputs: { ...form.validInputs, name: false },
            errors: { ...form.errors, name: "Asegúrese de ingresar letras únicamente." },
          });
        }
        break;
      case "inp_email":
        const regExpEmail = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
        if (evt.target.value !== "") {
          if (regExpEmail.test(evt.target.value)) {
            setForm({
              ...form,
              email: evt.target.value,
              validInputs: { ...form.validInputs, email: true },
              errors: { ...form.errors, email: "" },
            });
          } else {
            setForm({
              ...form,
              email: evt.target.value,
              validInputs: { ...form.validInputs, email: false },
              errors: {
                ...form.errors,
                email: "El correo ingresado no es correcto. Ej: garciasburger@gmail.com",
              },
            });
          }
        } else {
          setForm({
            ...form,
            email: evt.target.value,
            validInputs: { ...form.validInputs, email: false },
            errors: {
              ...form.errors,
              email: "Este campo no puede quedar vacío.",
            },
          });
        }
        break;
      case "inp_phone":
        const regExpPhone =
          /^((09[1-9](\s?)([0-9]{3})(\s?)([0-9]{3}))|((2|4)(\s?)([0-9]{3})(\s?)([0-9]{2})(\s?)([0-9]{2})))$/g;
        if (evt.target.value !== "") {
          if (!isNaN(evt.key) || evt.key === undefined) {
            if (regExpPhone.test(evt.target.value)) {
              setForm({
                ...form,
                phone: evt.target.value,
                validInputs: { ...form.validInputs, phone: true },
                errors: { ...form.errors, phone: "" },
              });
            } else {
              setForm({
                ...form,
                phone: evt.target.value,
                validInputs: { ...form.validInputs, phone: false },
                errors: {
                  ...form.errors,
                  phone:
                    "Formato de teléfono inválido. Ejemplos de formatos aceptados: 098 075 725 (móvil) o 2603 4394 (fijo).",
                },
              });
            }
          } else {
            setForm({
              ...form,
              phone: evt.target.value,
              validInputs: { ...form.validInputs, phone: false },
              errors: {
                ...form.errors,
                phone: "Asegúrese de ingresar números únicamente.",
              },
            });
          }
        } else {
          setForm({
            ...form,
            phone: evt.target.value,
            validInputs: { ...form.validInputs, phone: false },
            errors: {
              ...form.errors,
              phone: "Este campo no puede quedar vacío.",
            },
          });
        }
        break;
      case "inp_address1":
        if (evt.target.value !== "") {
          if (/\d/.test(evt.target.value)) {
            setForm({
              ...form,
              address1: evt.target.value,
              validInputs: { ...form.validInputs, address1: true },
              errors: { ...form.errors, address1: "" },
            });
          } else {
            setForm({
              ...form,
              address1: evt.target.value,
              validInputs: { ...form.validInputs, address1: false },
              errors: { ...form.errors, address1: "Por favor incluya el número de puerta." },
            });
          }
        } else {
          setForm({
            ...form,
            address1: evt.target.value,
            validInputs: { ...form.validInputs, address1: false },
            errors: { ...form.errors, address1: "Este campo no puede quedar vacío" },
          });
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

    if (Object.values(form.validInputs).includes(false)) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  };

  return (
    <section className="payment-form">
      {cartList.length > 0 ? (
        <form>
          <div>
            <button onClick={handleOnClick} className="active" ref={delivery}>
              Delivery a domicilio
            </button>
            <button onClick={handleOnClick}>Takeaway/Para llevar</button>
          </div>
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
              type="tel"
              id="inp_phone"
              placeholder="Ej.: 098 075 725 o 2603 4394"
              value={form.phone}
              onAction={handleChange}
              errorText={form.errors.phone}
              labelText="Teléfono/Celular"
            />
            {isDelivery ? (
              <div>
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
              <div>
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
            <Button
              disabled={!formValid}
              type="submit"
              text="Enviar Pedido"
              click={(evt) => generateOrder(evt)}
            />
            {loading ? <Loader /> : <></>}
          </fieldset>
        </form>
      ) : orderSent ? (
        <div>
          <h2>¡PEDIDO EXITOSO!</h2>
          <IoCheckmarkCircleOutline />
          <p>El código de referencia de su pedido es: {orderRef}</p>
          <Link to="/">
            <Button text="Volver al Inicio" click={() => setOrderSent(false)} />
          </Link>
        </div>
      ) : (
        <div>
          <h1>No tenemos idea cómo llegaste hasta acá... ◐‿◑</h1>
          <h2>¡Andá y pedite algo rico!</h2>
          <Link to="/">
            <Button text="Volver al Inicio" />
          </Link>
        </div>
      )}
    </section>
  );
};

export default PaymentForm;
