import { IoAdd, IoRemove, IoRemoveCircleOutline } from "react-icons/io5";
import { useCartContext } from "../../context/CartContext";
import "./CartItem.css";

const CartItem = ({ item }) => {
  const { removeItem, totalPrice, sumItem, subtractItem } = useCartContext();
  const {
    id,
    title,
    category,
    picURL,
    quantity,
    additionals,
    price,
    extrasPrice,
    extrasSelected = [],
  } = item;
  return (
    <article key={Math.random()} className="cart-item">
      <div className="product-info">
        <img src={picURL} alt={`Imagen de ${title}`} />
        <div>
          <h2>{title}</h2>
          <p className="item-category">{category}</p>
          <p className="item-extras">{additionals}</p>
          <p className="extras-selected">
            {extrasSelected ? (
              extrasSelected.map((extra) => <i key={Math.random()}> {extra.text}. </i>)
            ) : (
              <fragment key="null"></fragment>
            )}
          </p>
          <div className="item-quantity">
            <button onClick={() => subtractItem(quantity, id)}>
              <IoRemove />
            </button>
            <h3>{quantity}</h3>
            <button onClick={() => sumItem(quantity, id)}>
              <IoAdd />
            </button>
          </div>
        </div>
      </div>
      <div className="action-menu">
        <h3>${totalPrice(price, quantity, extrasPrice)}</h3>
        <button className="btnRemove" onClick={() => removeItem(id)}>
          <IoRemoveCircleOutline />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
