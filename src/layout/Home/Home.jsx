import useDocumentTitle from "../../helpers/useDocumentTitle";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import "./Home.css";
import HomeCard from "../../components/HomeCard/HomeCard";
import FormInput from "../../components/FormInput/FormInput";
import { useState } from "react";

const Home = () => {
  useDocumentTitle("Inicio | García's Burgers");
  const [email, setEmail] = useState({
    value: "",
    isValid: false,
    error: "",
  });
  const [isChecked, setIsChecked] = useState(true);

  const handleChange = (evt) => {
    if (evt.target.id === "inp_subscribe") {
      const regExpEmail = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
      if (evt.target.value !== "") {
        if (regExpEmail.test(evt.target.value)) {
          setEmail({
            ...email,
            value: evt.target.value,
            isValid: true,
            error: "",
          });
          evt.target.classList.remove("invalid");
        } else {
          setEmail({
            ...email,
            value: evt.target.value,
            isValid: false,
            error: "❌ El correo ingresado no es correcto. Ej: garciasburger@gmail.com",
          });
          evt.target.classList.add("invalid");
        }
      } else {
        setEmail({
          ...email,
          value: evt.target.value,
          isValid: false,
          error: "❌ Este campo no puede quedar vacío.",
        });
        evt.target.classList.add("invalid");
      }
    } else {
      setIsChecked(!isChecked);
    }
  };

  const onSubmit = () => {
    if (email.isValid) {
      if (isChecked) {
        alert(
          `¡Felicitaciones! Te has suscrito al boletín de noticias de García's Burgers con el correo: ${email.value} y has aceptado recibir novedades y formularios de opinión.`
        );
      } else {
        alert(
          `¡Felicitaciones! Te has suscrito al boletín de noticias de García's Burgers con el correo: ${email.value}.`
        );
      }
    }
  };

  return (
    <main className="home">
      <section className="banner">
        <div>
          <h2>Takeaway & Delivery</h2>
          <h1>García’s Burgers</h1>
          <Link to="/menu/hamburguesas">
            <Button text="Ver Menú" />
          </Link>
        </div>
      </section>
      <section className="content home-container">
        <div className="cards">
          <img
            id="presentation"
            src="https://i.postimg.cc/g2kfv0V3/presentacion.png"
            alt="Presentación García’s Burgers"
          />
          <div>
            <HomeCard
              where="hamburguesas"
              title="Hamburguesas"
              text="Disfruta de nuestra amplia variedad de hamburguesas. También tenemos opciones vegetarianas."
              imgSrc="https://i.postimg.cc/VLFxrtCY/burger-Home.png"
            />
            <HomeCard
              where="milanesas"
              title="Milanesas"
              text="Puede ser sola, al pan o cubierta de muchos toppings distintos."
              imgSrc="https://i.postimg.cc/W4HwWkct/milanesa.png"
            />
            <HomeCard
              where="empanadas"
              title="Empanadas"
              text="Probá los 18 tipos de empanadas distintas que tenemos para vos. Todas a $75."
              imgSrc="https://i.postimg.cc/zvC9kb2F/empanada-Home.png"
            />
          </div>
        </div>
        <div className="about">
          <img src="https://i.postimg.cc/d03rp6SN/personal2.png" alt="Equipo de García’s Burgers" />
          <div className="text">
            <h3>Conocé al...</h3>
            <h2>Equipo de García’s</h2>
            <Link to="/nosotros">
              <Button text="Saber Más" />
            </Link>
          </div>
        </div>
      </section>
      <section className="display-grid">
        <div id="img1">
          <img src="https://i.postimg.cc/pL1ycxfF/cocina.png" alt="" />
        </div>
        <div id="order">
          <img src="https://i.postimg.cc/y6mMVk4B/cerveza.png" alt="" />
          <Link to="/menu/hamburguesas">
            <Button text="Pedir" />
          </Link>
        </div>
        <div id="img2">
          <img src="https://i.postimg.cc/L8snVh1S/empanada2.png" alt="" />
        </div>
        <div id="this-is">
          <h2>
            <span>Esto es</span> <br /> García’s Burgers
          </h2>
        </div>
        <div id="img3">
          <img src="https://i.postimg.cc/c4hvYf6T/burger4.png" alt="" />
        </div>
        <div id="img4">
          <img src="https://i.postimg.cc/Wz6rvDCG/postre-Salchichon.png" alt="" />
        </div>
      </section>
      <section className="newsletter home-container">
        <div className="newsletter-wrapper">
          <h1>
            Suscríbete <br />
            <span>para recibir ofertas únicas</span>
          </h1>
          <div>
            <FormInput
              type="email"
              onAction={handleChange}
              placeholder="Ingrese su correo - ej.: correo@ejemplo.com"
              id="inp_subscribe"
              value={email.value}
              errorText={email.error}
            />
            <Button text="Enviar" click={onSubmit} />
          </div>
          <div className="chk-div">
            <input
              type="checkbox"
              id="chk-opt"
              defaultChecked
              className="chk"
              onChange={handleChange}
            />
            <label htmlFor="chk-opt">
              Deseo recibir novedades y formularios de opinión sobre García’s Burgers.
            </label>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
