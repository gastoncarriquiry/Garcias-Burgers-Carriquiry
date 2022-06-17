import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import "./ItemListContainer.css";
import { useNavigate, useParams } from "react-router-dom";
import SecondaryNavBar from "../SecondaryNavBar/SecondaryNavBar";
import Loader from "../Loader/Loader";
import useDocumentTitle from "../../helpers/useDocumentTitle";
import { getFirestore, getDocs, collection, query, where } from "firebase/firestore";

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

    if (category) {
      const queryFilter = query(queryCollection, where("category", "==", `${category}`));
      getDocs(queryFilter)
        .then((res) =>
          res.docs.length === 0
            ? navigate("/error404", { replace: true })
            : setItems(res.docs.map((item) => ({ id: item.id, ...item.data() })))
        )
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      getDocs(queryCollection)
        .then((res) => setItems(res.docs.map((item) => ({ id: item.id, ...item.data() }))))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [category]);

  return (
    <main className="menu-cont">
      <SecondaryNavBar />
      <section className="item-list">{loading ? <Loader /> : <ItemList items={items} />}</section>
    </main>
  );
}

export default ItemListContainer;
