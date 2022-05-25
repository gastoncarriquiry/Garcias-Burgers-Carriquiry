import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail";
import { mockFetch } from "../../helpers/mockFetch";
import "./ItemDetailContainer.css";
import Loader from "../Loader/Loader";

const ItemDetailContainer = () => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    mockFetch(id)
      .then((res) => setItem(res))
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  }, [id]);

  //TODO: preguntar porque muestra el loading poco tiempo y me devuelve un undefined y después carga completo

  return (
    <section className="item-detail-container">
      {loading ? <Loader /> : <ItemDetail key={item.id} item={item} />}
    </section>
  );
};

export default ItemDetailContainer;
