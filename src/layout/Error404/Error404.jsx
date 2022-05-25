import "./Error404.css";
import { Link } from "react-router-dom";
import useDocumentTitle from "../../helpers/useDocumentTitle";

const Error404 = () => {
  useDocumentTitle("Error 404 | García's Burgers");
  return (
    <div id="error404">
      <div className="screen1">
        <img src="https://svgshare.com/i/hQi.svg" alt="Logo García's" />
        <h1>¡Ups!</h1>
        <h2>Nos comimos la página que buscabas.</h2>
        <h3>La confundimos con una hamburguesa de García's ¯\_(ツ)_/¯</h3>
      </div>
      <div className="screen2">
        <section>
          <div>
            <h3>Encontrá la hamburguesa que buscás en estos links útiles:</h3>
            <ul>
              <li>
                <Link to="/">
                  <button>INICIO</button>
                </Link>
              </li>
              <li>
                <Link to="/menu">
                  <button>MENÚ</button>
                </Link>
              </li>
              <li>
                <Link to="/nosotros">
                  <button>NOSOTROS</button>
                </Link>
              </li>
              <li>
                <Link to="/contacto">
                  <button>CONTACTO</button>
                </Link>
              </li>
              <li>
                <Link to="/carrito">
                  <button>CARRITO</button>
                </Link>
              </li>
            </ul>
          </div>
          <div className="logoAnimation">
            <img
              src="https://i.postimg.cc/YSMwz74y/animation3.png"
              alt="Logo animado 3"
              id="animatedLogo3"
            />
            <img
              src="https://i.postimg.cc/fRxNdyb9/animation2.png"
              alt="Logo animado 2"
              id="animatedLogo2"
            />
            <img
              src="https://i.postimg.cc/8z8GsMTG/animation1.png"
              alt="Logo animado 1"
              id="animatedLogo1"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Error404;
