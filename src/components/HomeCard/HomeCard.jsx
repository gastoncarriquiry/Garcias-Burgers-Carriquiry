import "./HomeCard.css";
import { Link } from "react-router-dom";

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
