import { useState } from "react";
import { IoAdd, IoRemove } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./ItemCount.css";

const ProductAdded = () => {
  return (
    <div className="buttons">
      <Link to="/carrito">
        <button className="btn finish">Finalizar Pedido</button>
      </Link>
      <Link to="/menu">
        <button className="btn">Pedir Más</button>
      </Link>
    </div>
  );
};

const ItemCount = ({ available, initial, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);
  const [state, setState] = useState("notDone");

  const nextStep = () => {
    setState("done");
  };

  const sumProduct = () => {
    if (quantity <= 49) {
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

  return (
    <>
      {available ? (
        state === "notDone" ? (
          <div className="counter">
            <div>
              <button onClick={subtractProduct}>
                <IoRemove />
              </button>
              <h2 id="qty">{quantity}</h2>
              <button onClick={sumProduct}>
                <IoAdd />
              </button>
            </div>
            <button
              onClick={() => {
                onAdd(quantity);
                nextStep();
              }}
              className="btn"
            >
              Agregar al Carrito
            </button>
          </div>
        ) : (
          <ProductAdded />
        )
      ) : (
        <div className="counter disabled">
          <div className="disabled">
            <button onClick={subtractProduct} disabled>
              <IoRemove />
              <IoAdd />
            </button>
            <h2 id="qty">{quantity}</h2>
            <button onClick={sumProduct} disabled>
              <IoAdd />
            </button>
          </div>
          <button className="btn disabled">Agregar al Carrito</button>
        </div>
      )}
    </>
  );
};

export default ItemCount;
