import ItemCount from "../ItemCount/ItemCount";
import "./Item.css";

const Item = ({ item }) => {
  const { id, title, description, picURL, price, available, initial } = item;

    return (
    //TODO: Arreglar estilos, counter, etc
    <article className="item" key={id}>
      <img src={picURL} alt="Imagen de producto" />
      <div className="item-text">
        <h2>{title}</h2>
        <p>{description}</p>
        <p>
          <b>$ {price}</b>
        </p>
      </div>
      <ItemCount available={available} initial={initial} product={title} />
    </article>
  );
};

export default Item;
