import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import ItemList from "../ItemList/ItemList";
import Loader from "../Loader/Loader";
import SecondaryNavBar from "../SecondaryNavBar/SecondaryNavBar";
import "./ItemListContainer.css";

function ItemListContainer() {
  useDocumentTitle("Menú | García's Burgers");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { category } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    const db = getFirestore();
    const queryCollection = collection(db, "products");

    const queryFilter = category
      ? query(queryCollection, where("category", "==", category))
      : queryCollection;
    getDocs(queryFilter)
      .then((res) =>
        res.docs.length === 0
          ? navigate("/error404", { replace: true })
          : setItems(res.docs.map((item) => ({ id: item.id, ...item.data() })))
      )
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category, navigate]);

  return (
    <main className="menu-cont">
      <SecondaryNavBar />
      <section className="item-list">{loading ? <Loader /> : <ItemList items={items} />}</section>
    </main>
  );
}

export default ItemListContainer;
