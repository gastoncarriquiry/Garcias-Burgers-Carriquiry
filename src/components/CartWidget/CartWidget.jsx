import { IoCartOutline } from "react-icons/io5";
import { useCartContext } from "../../context/CartContext";
import "./CartWidget.css";

function CartWidget() {
  const { getQuantity } = useCartContext();
  return (
    <button className="Cart-Widget-button">
      <IoCartOutline size="2em" />
      <span className="qty-display">{getQuantity()}</span>
    </button>
  );
}

export default CartWidget;
