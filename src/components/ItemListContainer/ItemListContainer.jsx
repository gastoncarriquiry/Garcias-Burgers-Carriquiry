import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import "./ItemListContainer.css";
import { Waveform } from "@uiball/loaders";
import { mockFetch } from "../../mockFetch";

function ItemListContainer({ greeting }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //TODO: agregar un if para filtrar por tipo de comida
    mockFetch()
      .then((res) => setItems(res))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <h1>{greeting}</h1>
      <section className="item-list">
        {loading ? (
          <div className="loader">
            <Waveform color="white" />
          </div>
        ) : (
          <ItemList items={items} />
        )}
      </section>
    </main>
  );
}

export default ItemListContainer;
