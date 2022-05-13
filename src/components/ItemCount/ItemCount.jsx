import { useState } from "react";
import "./ItemCount.css";

const ItemCount = ({ available, initial, product, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  if (available === false) {
    initial = 0;
    // TODO: botones disabled - texto "no hay stock"
  }

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
    <div className="counter">
      <div>
        <button onClick={subtractProduct}>-</button>
        <h2 id="qty">{quantity}</h2>
        <button onClick={sumProduct}>+</button>
      </div>
      <button onClick={addProduct} id="btn_agregar">
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
