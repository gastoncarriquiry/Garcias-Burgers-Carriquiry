import { IoCartOutline } from "react-icons/io5";
import { useCartContext } from "../../context/CartContext";
import "./CartWidget.css";

function CartWidget() {
  const { getQuantity } = useCartContext();
  let totalQuantity = getQuantity();
  return (
    <button className="Cart-Widget-button">
      <IoCartOutline size="2em" />
      {totalQuantity === 0 ? <></> : <span className="qty-display">{totalQuantity}</span>}
    </button>
  );
}

export default CartWidget;
