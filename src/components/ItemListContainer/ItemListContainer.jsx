import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import "./ItemListContainer.css";
import { mockFetch } from "../..//helpers/mockFetch";
import { useParams } from "react-router-dom";
import SecondaryNavBar from "../SecondaryNavBar/SecondaryNavBar";
import Loader from "../Loader/Loader";
import useDocumentTitle from "../../helpers/useDocumentTitle";

function ItemListContainer() {
  useDocumentTitle("Menú | García's Burgers")
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { category } = useParams();

  useEffect(() => {
    setLoading(true);

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
      <SecondaryNavBar />
      <section className="item-list">{loading ? <Loader /> : <ItemList items={items} />}</section>
    </main>
  );
}

export default ItemListContainer;
