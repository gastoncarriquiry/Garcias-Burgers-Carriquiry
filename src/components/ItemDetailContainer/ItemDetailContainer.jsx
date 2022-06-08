import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail";
import "./ItemDetailContainer.css";
import useDocumentTitle from "../../helpers/useDocumentTitle";
import Loader from "../Loader/Loader";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const ItemDetailContainer = () => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  useDocumentTitle(item.title + " | García's Burgers");

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    const db = getFirestore();
    const dbQuery = doc(db, "products", `${id}`);
    getDoc(dbQuery)
      .then((res) => setItem({ id: res.id, ...res.data() }))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <section className="item-detail-container">
      {loading ? <Loader /> : <ItemDetail key={item.id} item={item} />}
    </section>
  );
};

export default ItemDetailContainer;
