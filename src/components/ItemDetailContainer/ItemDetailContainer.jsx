import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail";
import { Waveform } from "@uiball/loaders";
import { mockFetch } from "../../mockFetch";
import "./ItemDetailContainer.css";

const ItemDetailContainer = () => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    mockFetch(id)
      .then((res) => setItem(res))
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  }, [id]);

  //TODO: preguntar porque no anda el loading

  return (
    <section className="item-detail-container">
      {loading ? (
        <div className="loader">
          <Waveform color="white" />
        </div>
      ) : (
        <ItemDetail key={item.id} item={item} />
      )}
    </section>
  );
};

export default ItemDetailContainer;
