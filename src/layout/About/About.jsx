import useDocumentTitle from "../../hooks/useDocumentTitle";
import "./About.css";

const About = () => {
  useDocumentTitle("Nosotros | García's Burgers");
  return (
    <main className="aboutpg">
      <div className="cont">
        <div className="location">
          <iframe
            title="Ubicación García's Burgers"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13091.368982379106!2d-56.08728786044921!3d-34.885307499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f878e1f748775%3A0x63774da40e3bcab6!2sGarcia%60s%20takeaway%20%26%20delivery!5e0!3m2!1ses-419!2suy!4v1655486958299!5m2!1ses-419!2suy"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="text">
            <h2>García’s Burgers</h2>
            <p>
              Ubicados en el corazón de Carrasco en Mariano Uriarte 6300 esq. Córcega. Aunque no
              tenemos muchas mesas, siempre tenemos un espacio para ti.
            </p>
            <br />
            <p>Estamos abiertos:</p>
            <ul>
              <li>Lunes a jueves: 11:30 - 15:00 y 19:30 - 23:00</li>
              <li>Viernes: 11:30 - 15:00 y 19:30 - 00:00</li>
              <li>Sábado: 19:30 - 00:00</li>
              <li>Domingo: 19:00 - 23:00</li>
            </ul>
          </div>
        </div>
        <div className="team">
          <img src="https://i.postimg.cc/d03rp6SN/personal2.png" alt="Equipo de García's Burgers" />
          <div className="text">
            <h2>Nuestro Equipo</h2>
            <p>
              Compromiso, esfuerzo y pasión por lo que hacemos son solo algunas de las
              características que nos definen como equipo. Siempre listos para darte el mejor
              servicio porque <b>#AmamosLoQueHacemos</b>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
