import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import "./ItemListContainer.css";
import { mockFetch } from "../..//helpers/mockFetch";
import { useParams } from "react-router-dom";
import SecondaryNavBar from "../SecondaryNavBar/SecondaryNavBar";
import Loader from "../Loader/Loader";
import useDocumentTitle from "../../helpers/useDocumentTitle";
import { getFirestore, getDocs, collection, query, where } from "firebase/firestore";

function ItemListContainer() {
  useDocumentTitle("Menú | García's Burgers");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { category } = useParams();

  // useEffect(() => {
  //   setLoading(true);

  //   const db = getFirestore();
  //   const queryCollection = collection(db, "products");

  //   if (category) {
  //     const queryFilter = query(queryCollection, where("category", "==", `${category}`));
  //     getDocs(queryFilter)
  //       .then((res) => setItems(res.docs.map((item) => ({ id: item.id, ...item.data() }))))
  //       .catch((err) => console.log(err))
  //       .finally(() => setLoading(false));
  //   } else {
  //     getDocs(queryCollection)
  //       .then((res) => setItems(res.docs.map((item) => ({ id: item.id, ...item.data() }))))
  //       .catch((err) => console.log(err))
  //       .finally(() => setLoading(false));
  //   }
  // }, [category]);

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
