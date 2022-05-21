import { useCartContext } from "../../context/CartContext";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";

const Cart = () => {
  //TODO: this
  // const [content, setContent] = useState();
  const { cartList, removeItem, getTotal, clearCart } = useCartContext();
  //console.log(cartList);

  const totalPrice = (price, quantity) => {
    return price * quantity;
  };

  return (
    <div>
      {/* TODO: modularizar en CartList y CartItem */}
      {/* TODO: styles*/}
      {cartList.length > 0 ? (
        cartList.map((item) => (
          <>
            <article key={item.id}>
              <div>
                <h2>{item.title}</h2>
                <p>{item.extras}</p>
                <h3>{item.quantity}</h3>
              </div>
              <div>
                <button className="btnRemove" onClick={() => removeItem(item.id)}>
                  <IoRemoveCircleOutline />
                </button>
                <h3>{totalPrice(item.price, item.quantity)}</h3>
              </div>
            </article>
          </>
        ))
      ) : (
        <h2>No hay nada</h2>
      )}
      <h1>{getTotal()}</h1>
      <button onClick={() => clearCart()}>
        <IoTrashOutline />
      </button>
    </div>
  );
};

export default Cart;

// {cartList.length > 0 ? (cartList.map((item) => (

//   ))) : (<div>hola</div>)
