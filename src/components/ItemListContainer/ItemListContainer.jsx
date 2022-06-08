import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import "./ItemListContainer.css";
import { useParams } from "react-router-dom";
import SecondaryNavBar from "../SecondaryNavBar/SecondaryNavBar";
import Loader from "../Loader/Loader";
import useDocumentTitle from "../../helpers/useDocumentTitle";
import { getFirestore, getDocs, collection, query, where, setDoc, doc } from "firebase/firestore";
// import Button from "../Button/Button";
// import { itemList } from "../../data/data";

function ItemListContainer() {
  useDocumentTitle("Menú | García's Burgers");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { category } = useParams();

  //UPLOAD ALL ITEMS FROM ../data/data.js
  /*const uploadItems = () => {
    const db = getFirestore();
    for (const item in itemList) {
      let product = {};
      product.title = itemList[item].title;
      product.category = itemList[item].category;
      product.description = itemList[item].description;
      product.additionals = itemList[item].additionals;
      product.picURL = itemList[item].picURL;
      product.price = itemList[item].price;
      product.available = itemList[item].available;
      product.initial = itemList[item].initial;
      product.extras = itemList[item].extras;
      setDoc(doc(db, "products", itemList[item].id), product)
        .catch(console.error)
        .finally(console.log);
    }
  };*/

  useEffect(() => {
    setLoading(true);

    const db = getFirestore();
    const queryCollection = collection(db, "products");

    if (category) {
      const queryFilter = query(queryCollection, where("category", "==", `${category}`));
      getDocs(queryFilter)
        .then((res) => setItems(res.docs.map((item) => ({ id: item.id, ...item.data() }))))
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
    <main>
      <SecondaryNavBar />
      {/* BUTTON TO UPLOAD ALL ITEMS IN ../data/data.js */}
      {/* <Button text="Upload items" click={uploadItems} /> */}
      <section className="item-list">{loading ? <Loader /> : <ItemList items={items} />}</section>
    </main>
  );
}

export default ItemListContainer;
