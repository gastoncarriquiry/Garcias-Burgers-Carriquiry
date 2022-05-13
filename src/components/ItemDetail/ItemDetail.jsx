import "./ItemDetail.css";

const ItemDetail = ({ item }) => {
  const { id, title, description, picURL, price, available, initial } = item;
  return (
    <article className="item-detail" key={id}>
      <img src={picURL} alt="Imagen de producto" />
      <div className="item-text">
        <h2>{title}</h2>
        <p>{description}</p>
        <p>
          <b>$ {price}</b>
        </p>
      </div>
    </article>
  );
};

export default ItemDetail;
