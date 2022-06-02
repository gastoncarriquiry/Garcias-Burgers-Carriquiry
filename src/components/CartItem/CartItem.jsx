import { IoRemoveCircleOutline, IoAdd, IoRemove } from "react-icons/io5";
import "./CartItem.css";
import { useCartContext } from "../../context/CartContext";

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
  console.log(extrasSelected);
  return (
    <article key={id} className="cart-item">
      <div className="product-info">
        <img src={picURL} alt={`Imagen de ${title}`} />
        <div>
          <h2>{title}</h2>
          <p className="item-category">{category}</p>
          <p className="item-extras">{additionals}</p>
          <p className="extras-selected">
            {extrasSelected ? extrasSelected.map((extra) => <>| {extra.text} | </>) : <></>}
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
