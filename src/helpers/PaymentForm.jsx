import { useCartContext } from "../../context/CartContext";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import Button from "../Button/Button";
import useDocumentTitle from "../../helpers/useDocumentTitle";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

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

  const generateOrder = () => {
    let order = {};

    //TODO: add address, takeaway/delivery

    order.buyer = {
      name: "John Doe",
      email: "johndoe123@email.com",
      phone: "12345678",
      address: "",
    };
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
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
      .finally(() => clearCart());
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
        if (
          (evt.nativeEvent.data === " " || evt.nativeEvent.data) === null ||
          isNaN(evt.nativeEvent.data) ||
          evt.target.value !== ""
        ) {
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
            errors: { ...form.errors, name: "Asegúrese de ingresar letras únicamente." },
          });
        }
        break;
      case "inp_email":
        const regExpEmail = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
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
        break;
      case "inp_phone":
        const regExpPhone =
          /^((09[1-9](\s?)([0-9]{3})(\s?)([0-9]{3}))|((2|4)(\s?)([0-9]{3})(\s?)([0-9]{2})(\s?)([0-9]{2})))$/g;
        if (evt.nativeEvent.data === null || !isNaN(evt.nativeEvent.data)) {
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
                  "Formato de teléfono inválido. Ejemplos de formatos aceptados: 098 075 725 (móvil) o 2603 4394 (fijo)",
              },
            });
          }
        }
        break;
      case "inp_address1":
        if (evt.target.value !== "") {
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
            errors: { ...form.errors, address1: "Este campo no puede quedar vacío" },
          });
        }
        break;
      case "inp_address2":
        setForm({ ...form, address2: evt.target.value });
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
            <div>
              <label htmlFor="inp_nombre">Nombre</label>
              <input
                type="text"
                id="inp_nombre"
                placeholder="Nombre y Apellido"
                value={form.name}
                onChange={handleChange}
              />
              <p className="error">{form.errors.name}</p>
            </div>
            <div>
              <label htmlFor="inp_email">Correo Electrónico</label>
              <input
                type="email"
                id="inp_email"
                placeholder="ejemplo@correo.com"
                value={form.email}
                onChange={handleChange}
              />
              <p className="error">{form.errors.email}</p>
            </div>
            <div>
              <label htmlFor="inp_phone">Teléfono/Celular</label>
              <input
                type="tel"
                id="inp_phone"
                placeholder="Teléfono/Celular"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleChange}
              />
              <p className="error">{form.errors.phone}</p>
            </div>
            {isDelivery ? (
              <div>
                <div>
                  <label htmlFor="inp_address1">
                    Dirección <small>(calle y número de puerta)</small>
                  </label>
                  <input
                    type="text"
                    id="inp_address1"
                    placeholder="Mariano Uriarte 6300"
                    value={form.address1}
                    onChange={handleChange}
                    onBlur={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="inp_address2">
                    Esquina <small>(opcional)</small>
                  </label>
                  <input
                    type="text"
                    id="inp_address2"
                    placeholder="Córcega"
                    value={form.address2}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ) : (
              <div>
                <p>
                  Nuestro local se encuentra en Mariano Uriarte 6300 esq. Córcega. Estamos abierto
                  entre las 11:30 - 15:00 y 19:30 - 23:00 de lunes a jueves, entre las 11:30 - 15:00
                  y 19:30 - 00:00 los viernes, entre las 19:30 - 00:00 los sábados y los domingos
                  entre las 19:00 - 23:00.
                </p>
              </div>
            )}
            <Button
              disabled={!formValid}
              type="submit"
              click={generateOrder}
              text="Enviar Pedido"
            />
          </fieldset>
        </form>
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
