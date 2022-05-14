import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import "./ItemListContainer.css";
import { Waveform } from "@uiball/loaders";
import { mockFetch } from "../../mockFetch";
import { useParams } from "react-router-dom";

function ItemListContainer() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  //TODO: loader not working

  const { category } = useParams();

  useEffect(() => {
    if (category) {
      mockFetch()
        .then((res) => setItems(res.filter((item) => item.category === category)))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else {
      mockFetch()
        .then((res) => setItems(res))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [category]);

  return (
    <main>
      {/* TODO: add secondary NavBar for filtering categories  */}
      <h1>MENÚ</h1>
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
