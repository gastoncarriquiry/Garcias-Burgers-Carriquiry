import { Link } from "react-router-dom";
import Button from "../Button/Button";

const OrderEmpty = () => {
  return (
    <div className="empty">
      <h1>No tenemos idea cómo llegaste hasta acá... ◐‿◑</h1>
      <h2>¡Andá y pedite algo rico!</h2>
      <Link to="/">
        <Button text="Volver al Inicio" />
      </Link>
    </div>
  );
};

export default OrderEmpty;
