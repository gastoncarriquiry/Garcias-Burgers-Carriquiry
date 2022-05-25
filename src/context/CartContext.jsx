import { createContext, useContext, useState } from "react";

const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);

const CartContextProvider = (props) => {
  const [cartList, setCartList] = useState([]);
  const addToCart = (item) => {
    setCartList([...cartList, item]);
  };

  const removeItem = (id) => {
    const itemToRemove = cartList.filter((item) => item.id != id);
    setCartList(itemToRemove);
  };

  const clearCart = () => {
    setCartList([]);
  };

  const totalPrice = (price, quantity) => {
    return price * quantity;
  };

  const getTotal = () => {
    let subTotal = 0;
    for (const item in cartList) {
      let totalPrice = cartList[item].price * cartList[item].quantity;
      subTotal += totalPrice;
    }
    return subTotal;
  };

  const getQuantity = () => {
    let quantity = 0;
    for (const item in cartList) {
      let itemQuantity = cartList[item].quantity;
      quantity += itemQuantity;
    }
    return quantity;
  };

  const sumItem = (quantity, id) => {
    if (quantity <= 49) {
      if (quantity === 50) {
        console.log("No puede seleccionar más productos.");
      }
      for (const item in cartList) {
        if (cartList[item].id === id) {
          cartList[item].quantity++;
          setCartList([...cartList]);
        }
      }
    }
  };

  const subtractItem = (quantity, id) => {
    if (quantity > 1) {
      if (quantity === 1) {
        console.log("Límite mínimo de orden.");
      }
      for (const item in cartList) {
        if (cartList[item].id === id) {
          cartList[item].quantity--;
          setCartList([...cartList]);
        }
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        props,
        cartList,
        addToCart,
        clearCart,
        removeItem,
        getTotal,
        totalPrice,
        getQuantity,
        sumItem,
        subtractItem,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export { CartContextProvider, CartContext };
