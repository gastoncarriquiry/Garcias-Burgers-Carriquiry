import { useState } from "react";
import "./ItemCount.css";

const ItemCount = ({ disponible = true, initial = 1, producto}) => {
  const [cantidad, setCantidad] = useState(initial);

  if (disponible === false) {
    initial = 0;
    // TODO: botones disabled - texto "no hay stock"
  }

  const sumarProducto = () => {
    if (cantidad < 99) {
      setCantidad(cantidad + 1);
    } else if (cantidad === 99) {
      console.log("No puede seleccionar más productos.");
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
      console.log(`¡${cantidad} ${producto} agregados exitosamente!"`);
    }
  };

  return (
    <div className="counter">
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
