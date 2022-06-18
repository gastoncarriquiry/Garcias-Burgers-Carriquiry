import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import ItemDetail from "../ItemDetail/ItemDetail";
import Loader from "../Loader/Loader";
import "./ItemDetailContainer.css";

const ItemDetailContainer = () => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  useDocumentTitle(item.title + " | García's Burgers");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    const db = getFirestore();
    const dbQuery = doc(db, "products", id);
    getDoc(dbQuery)
      .then((res) =>
        res.data() === undefined
          ? navigate("/error404", { replace: true })
          : setItem({ id: res.id, ...res.data() })
      )
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id, navigate]);

  return (
    <section className="item-detail-container">
      {loading ? <Loader /> : <ItemDetail key={item.id} item={item} />}
    </section>
  );
};

export default ItemDetailContainer;
