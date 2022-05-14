import { useState } from "react";
import Button from "../Button/Button";
import "./ItemCount.css";

const ItemCount = ({ available, initial, product, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  const sumProduct = () => {
    if (quantity <= 49) {
      // USO CANTIDAD LIMITADA POR 50 PORQUE HABLAMOS DE COMIDA Y NO TIENE STOCK PORQUE SE PREPARAN EN EL MOMENTO
      setQuantity(quantity + 1);
      if (quantity === 50) {
        console.log("No puede seleccionar más productos.");
      }
    }
  };

  const subtractProduct = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else if (quantity === 1) {
      console.log("Debe seleccionar al menos un producto.");
    }
  };

  const addProduct = () => {
    if (quantity === 0) {
      console.log("Debe agregar al menos un producto");
    } else {
      console.log(`¡${quantity} ${product} agregados exitosamente!"`);
    }
  };

  return (
    <>
      {available ? (
        <div className="counter">
          <div>
            <button onClick={subtractProduct}>-</button>
            <h2 id="qty">{quantity}</h2>
            <button onClick={sumProduct}>+</button>
          </div>
          <Button click={addProduct} text="Agregar al Carrito" disabled={false}/>
        </div>
      ) : (
        <div className="counter disabled">
          <div className="disabled">
            <button onClick={subtractProduct} disabled>-</button>
            <h2 id="qty">{quantity}</h2>
            <button onClick={sumProduct} disabled>+</button>
          </div>
          <Button click={addProduct} text="Agregar al Carrito" disabled={true}/>
        </div>
      )}
    </>
  );
};

export default ItemCount;
