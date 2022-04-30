import { IoCartOutline } from "react-icons/io5";
import "./CartWidget.css";

function CartWidget() {
  return (
    <button className='Cart-Widget'>
      <IoCartOutline size="2em" />
      <span className="qty-display">0</span>
    </button>
  );
}

export default CartWidget;
