import { Link } from "react-router-dom";
import Button from "../../Button/Button";
import "./Item.css";

const Item = ({ item }) => {
  const { id, title, category, description, extras, picURL, price, available, initial } = item;

  return (
    <article className="item" key={id}>
      <img src={picURL} alt={`Imagen de ${category} ${title}`} />
      <div className="item-container">
        <div className="item-text">
          <h2>{title}</h2>
          <p className="extras">guarnición de papas fritas incluidas</p>
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
