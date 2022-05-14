import "./ItemDetail.css";
import ItemCount from ".././ItemCount/ItemCount";

const ItemDetail = ({ item }) => {
  const { id, title, category, description, extras, picURL, price, available, initial } = item;
  return (
    <article className="item-detail" key={id}>
      <img src={picURL} alt={`Imagen de ${category} ${title}`} />
      <div className="detail-container">
        <div className="item-detail-text">
          <p className="category">{category}</p>
          <h1>{title}</h1>
          <p className="description">{description}</p>
          <p className="extras">{extras}</p>
          <p className="price">
            <b>$ {price}</b>
          </p>
        </div>
        <ItemCount available={available} initial={initial} product={title} />
      </div>
    </article>
  );
};

export default ItemDetail;
