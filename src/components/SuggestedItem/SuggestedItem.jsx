import Button from "../Button/Button";

const SuggestedItem = ({ picURL, title, price, action }) => {
  return (
    <article>
      <div>
        <img src={picURL} alt={`Imagen de ${title}`} />
        <h3>{title}</h3>
        <h4>${price}</h4>
      </div>
      <Button text="Agregar al Carrito" click={action} />
    </article>
  );
};

export default SuggestedItem;
