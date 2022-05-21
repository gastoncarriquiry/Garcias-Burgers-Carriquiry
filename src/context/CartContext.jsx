import { createContext, useContext, useState } from "react";

const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);

const CartContextProvider = (props) => {
  const [cartList, setCartList] = useState([]);
  const addToCart = (item) => {
    setCartList([...cartList, item]);
  };

  const removeItem = (id) => {
    //TODO: this
    console.log(id);
    const itemToRemove = cartList.filter(item => item.id != id);
    setCartList(itemToRemove);
  };

  const clearCart = () => {
    setCartList([]);
  };

  const getTotal = () => {
    let subTotal = 0;
    for (const item in cartList) {
      let totalPrice = cartList[item].price * cartList[item].quantity;
      subTotal += totalPrice;
    }
    return subTotal;
  };

  return (
    <CartContext.Provider value={{ props, cartList, addToCart, clearCart, removeItem, getTotal }}>
      {props.children}
    </CartContext.Provider>
  );
};

export { CartContextProvider, CartContext };
