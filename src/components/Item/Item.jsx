import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./Item.css";

const Item = ({ item }) => {
  const { id, title, category, additionals, picURL, price } = item;

  return (
    <article className="item" key={id}>
      <img src={picURL} alt={`Imagen de ${category} ${title}`} />
      <div className="item-container">
        <div className="item-text">
          <h2>{title}</h2>
          <p className="extras">{additionals}</p>
          <p className="price">
            <b>$ {price}</b>
          </p>
        </div>
        <Link to={`/menu/${category}/${id}`}>
          <Button text="Ver Detalle" />
        </Link>
      </div>
    </article>
  );
};

export default Item;
