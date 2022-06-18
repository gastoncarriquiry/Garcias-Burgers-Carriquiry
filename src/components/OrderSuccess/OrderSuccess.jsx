import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

const OrderSuccess = ({ orderReference, action }) => {
  return (
    <div className="success">
      <h2>¡PEDIDO EXITOSO!</h2>
      <IoCheckmarkCircleOutline />
      <p>
        El código de referencia de su pedido es: <br /> <i>{orderReference}</i>
      </p>
      <Link to="/">
        <Button text="Volver al Inicio" click={action} />
      </Link>
    </div>
  );
};

export default OrderSuccess;
