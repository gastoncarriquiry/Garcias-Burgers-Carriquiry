import { Link } from "react-router-dom";
import "./HomeCard.css";

const HomeCard = ({ imgSrc, title, text, where }) => {
  return (
    <Link to={`/menu/${where}`} className="home-card">
      <img src={imgSrc} alt={`Imagen ${title}`} />
      <h3>{title}</h3>
      <p>{text}</p>
    </Link>
  );
};

export default HomeCard;
