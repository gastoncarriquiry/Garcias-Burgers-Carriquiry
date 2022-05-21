import "./ItemDetail.css";
import ItemCount from ".././ItemCount/ItemCount";
import { useState } from "react";

const ItemDetail = ({ item }) => {
  const { id, title, category, description, extras, picURL, price, available, initial } = item;
  const [count, setCount] = useState(undefined);

  const onAdd = (qty) => {
    console.log(qty);
    setCount(qty);
  };

  return (
    <article className="item-detail" key={id}>
      <img src={picURL} alt={`Imagen de ${category} ${title}`} />
      <div className="detail-container">
        <div className="item-detail-text">
          <p className="category">{category}</p>
          <h1>{title}</h1>
          <p className="description">{description}</p>
          <p className="extras">{extras}</p>
          <p className="price">
            <b>$ {price}</b>
          </p>
        </div>
        {count === undefined ? (
          <ItemCount available={available} initial={initial} onAdd={onAdd} />
        ) : (
          <ItemCount available={available} initial={initial} onAdd={onAdd} />
        )}
      </div>
    </article>
  );
};

export default ItemDetail;
