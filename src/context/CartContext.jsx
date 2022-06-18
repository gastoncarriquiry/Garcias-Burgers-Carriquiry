import { createContext, useContext, useState } from "react";

const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);

const CartContextProvider = (props) => {
  const [cartList, setCartList] = useState([]);
  const addToCart = (item) => {
    setCartList([...cartList, item]);
  };

  const removeItem = (id) => {
    const itemToRemove = cartList.filter((item) => item.id !== id);
    setCartList(itemToRemove);
  };

  const clearCart = (button) => {
    if (button) {
      if (window.confirm("¿Seguro desea vaciar el carrito?")) {
        setCartList([]);
      } else {
        return;
      }
    } else {
      setCartList([]);
    }
  };

  const totalPrice = (price, quantity, extras) => {
    if (extras) {
      return price * quantity + extras;
    } else {
      return price * quantity;
    }
  };

  const getTotal = () => {
    let subTotal = 0;
    let itemPrice = 0;
    for (const item in cartList) {
      if (cartList[item].extrasPrice !== undefined) {
        itemPrice = cartList[item].price * cartList[item].quantity + cartList[item].extrasPrice;
      } else {
        itemPrice = cartList[item].price * cartList[item].quantity;
      }
      subTotal += itemPrice;
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
        console.warn("No puede seleccionar más productos.");
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
        console.warn("Límite mínimo de orden.");
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
