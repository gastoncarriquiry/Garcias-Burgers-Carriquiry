import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import CartItemList from "../../components/CartItemList/CartItemList";
import OrderSummary from "../../components/OrderSumarry/OrderSummary";
import SuggestItem from "../../components/SuggestItem/SuggestItem";
import { useCartContext } from "../../context/CartContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import "./Cart.css";

const Cart = () => {
  useDocumentTitle("Carrito | García's Burgers");
  const { cartList } = useCartContext();

  return (
    <section className="Cart">
      {cartList.length > 0 ? (
        <div className="cart-container">
          <CartItemList />
          <OrderSummary />
        </div>
      ) : (
        <div className="emptyOrder">
          <h1>¡Tu pedido está vacío!</h1>
          <h2>¿Qué estás esperando?</h2>
          <Link to="/menu/hamburguesas">
            <Button text="Ver Menú" />
          </Link>
          <SuggestItem />
        </div>
      )}
    </section>
  );
};

export default Cart;
