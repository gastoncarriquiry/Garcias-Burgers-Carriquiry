import { IoRemoveCircleOutline, IoAdd, IoRemove } from "react-icons/io5";
import "./CartItem.css";
import { useCartContext } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { removeItem, totalPrice, sumItem, subtractItem } = useCartContext();
  return (
    <article key={item.id} className="cart-item">
      <div className="product-info">
        <img src={item.picURL} alt={`Imagen de ${item.title}`} />
        <div>
          <h2>{item.title}</h2>
          <p className="item-category">{item.category}</p>
          <p className="item-extras">{item.extras}</p>
          <div className="item-quantity">
            <button onClick={() => subtractItem(item.quantity, item.id)}><IoRemove/></button>
            <h3>{item.quantity}</h3>
            <button onClick={() => sumItem(item.quantity, item.id)}><IoAdd/></button>
          </div>
        </div>
      </div>
      <div className="action-menu">
        <h3>${totalPrice(item.price, item.quantity)}</h3>
        <button className="btnRemove" onClick={() => removeItem(item.id)}>
          <IoRemoveCircleOutline />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
