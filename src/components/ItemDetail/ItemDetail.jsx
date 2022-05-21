import "./ItemDetail.css";
import ItemCount from ".././ItemCount/ItemCount";
import { useState } from "react";
import { useCartContext } from "../../context/CartContext";

const ItemDetail = ({ item }) => {
  const { id, title, category, description, extras, picURL, price, available, initial } = item;
  const [count, setCount] = useState(undefined);

  const { addToCart, cartList } = useCartContext();

  const onAdd = (qty) => {
    setCount(qty);
    let itemInCart = cartList.find((item) => item.id === id);
    if (itemInCart !== undefined) {
      for (const item in cartList) {
        if (cartList[item].id === id) {
          if (cartList[item].quantity + qty > 50) {
            cartList[item].quantity = 50;
            alert(
              "Solo puedes agregar hasta 50 unidades de un mismo producto. Si de verdad deseas más, contáctate con García's Burgers por teléfono."
            );
          } else {
            cartList[item].quantity += qty;
          }
          console.log("edité la cantidad de " + cartList[item].title);
        }
      }
    } else {
      addToCart({ ...item, quantity: qty });
      console.log("agregué un nuevo elemento");
    }
  };

  //TODO: add extra ingredients functionality
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
