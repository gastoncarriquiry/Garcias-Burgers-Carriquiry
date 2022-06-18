import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import Button from "../Button/Button";
import OrderItem from "../OrderItem/OrderItem";
import "./OrderSummary.css";

const OrderSummary = () => {
  const { cartList, clearCart, getTotal } = useCartContext();
  return (
    <div className="order-summary">
      <h1>Resumen de Pedido</h1>
      <div className="summary-list">
        {cartList.map((item) => (
          <OrderItem item={item} key={Math.random()} />
        ))}
      </div>
      <div className="buttons">
        <p className="total">
          Subtotal: <b>${getTotal()}</b>
        </p>
        <Link to="/pago">
          <Button text="Pagar" />
        </Link>
        <button title="Vaciar Carrito" className="btnClear" onClick={() => clearCart(true)}>
          <IoTrashOutline />
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
