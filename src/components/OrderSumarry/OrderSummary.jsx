import { useCartContext } from "../../context/CartContext";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./OrderSummary.css";

const OrderSummary = ({ generateOrder }) => {
  const { cartList, clearCart, getTotal } = useCartContext();
  return (
    <div className="order-summary">
      <h1>Resumen de Pedido</h1>
      <div className="summary-list">
        {/* TODO: <OrderItem /> */}
        {cartList.map((item) => (
          <article key={Math.random()}>
            <div>
              <h3>{item.title}</h3>
              {item.extrasSelected !== undefined ? (
                item.extrasSelected.length > 0 ? (
                  <p className="hasExtras">+ Extras</p>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </div>
            <div>
              <p>
                <b>x{item.quantity}</b>
              </p>
            </div>
          </article>
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
