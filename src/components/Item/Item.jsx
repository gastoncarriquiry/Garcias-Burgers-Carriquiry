import React from "react";
import ItemCount from "../ItemCount/ItemCount";
import "./Item.css";

const Item = ({ id, title, description, picURL, price, disponible, initial }) => {
//   console.log(id, title, description, picURL, price);
  return (
    <article className="item" key={id}>
      <img src={picURL} alt="Imagen de producto" />
      <div className="item-text">
        <h2>{title}</h2>
        <p>{description}</p>
        <p>
          <b>$ {price}</b>
        </p>
      </div>
      <ItemCount disponible={disponible} initial={initial} producto={title} />
    </article>
  );
};

export default Item;
