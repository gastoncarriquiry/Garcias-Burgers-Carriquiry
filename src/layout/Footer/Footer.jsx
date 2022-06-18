import {
  IoGlobeOutline,
  IoLogoFacebook,
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoWhatsapp,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="links-container">
          <nav className="useful-links">
            <Link to="/nosotros">
              <p>¡Conocenos!</p>
            </Link>
            <Link to="/FAQ">
              <p>Preguntas Frecuentes</p>
            </Link>
            <Link to="/TyC">
              <p>Términos y Condiciones</p>
            </Link>
            <Link to="/privacidad">
              <p>Política de Privacidad</p>
            </Link>
          </nav>
          <nav className="socials">
            <a target="_blank" rel="noreferrer" href="https://es-la.facebook.com/garciastakeaway/">
              <IoLogoFacebook />
            </a>
            <a target="_blank" rel="noreferrer" href="https://www.instagram.com/garcias.burgers/">
              <IoLogoInstagram />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://l.instagram.com/?u=https%3A%2F%2Fapi.whatsapp.com%2Fsend%2F%3Fphone%3D59898075725%26app_absent%3D0&e=ATM-8Y7oAHfas74a6-6pIIjEhAzHhdIlsz9NUL7QVhomX_2OGeMQxUT0y9e3DasQVzlOk8AwCQ6su7ocgs9DWIs5rb-GPvztZnnvSJc&s=1"
            >
              <IoLogoWhatsapp />
            </a>
          </nav>
        </div>
        <div className="rights">
          <p>García's Burgers © 2022</p>
          <div>
            <p>Web Diseñada por Gaston Carriquiry</p>
            <div>
              <a target="_blank" rel="noreferrer" href="https://github.com/gastoncarriquiry">
                <IoLogoGithub />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/in/gastoncarriquiry/"
              >
                <IoLogoLinkedin />
              </a>
              <a target="_blank" rel="noreferrer" href="http://gastoncarriquiry.glitch.me/">
                <IoGlobeOutline />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
