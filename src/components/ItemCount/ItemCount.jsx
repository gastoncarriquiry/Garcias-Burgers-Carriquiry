import { useState } from "react";
import "./ItemCount.css";

const ItemCount = ({ stock, initial = 1 }) => {
  const [cantidad, setCantidad] = useState(initial);

  if (stock === 0) {
    initial = 0;
    // TODO: botones disabled - texto "no hay stock"
  }

  const sumarProducto = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    } else if (cantidad === stock) {
      console.log("No puede seleccionar más productos de los disponibles.");
    }
  };

  const restarProducto = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    } else if (cantidad === 1) {
      console.log("Debe seleccionar al menos un producto.");
    }
  };

  const agregarProducto = () => {
    if (cantidad === 0) {
      console.log("Debe agregar al menos un producto");
    } else {
      console.log("¡" + cantidad + " producto/s agregados exitosamente!");
    }
  };

  return (
    <div className="counter">
      <p>Stock disponible: {stock}</p>
      <div>
        <button onClick={restarProducto}>-</button>
        <h2 id="qty">{cantidad}</h2>
        <button onClick={sumarProducto}>+</button>
      </div>
      <button onClick={agregarProducto} id="btn_agregar">Agregar al carrito</button>
    </div>
  );
};

export default ItemCount;
