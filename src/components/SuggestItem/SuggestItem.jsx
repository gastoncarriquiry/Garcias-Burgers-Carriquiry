import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCartContext } from "../../context/CartContext";
import SuggestedItem from "../SuggestedItem/SuggestedItem";

const SuggestItem = () => {
  let itemList;
  const [suggestedItem, setSuggestedItem] = useState(undefined);

  const { addToCart } = useCartContext();

  useEffect(() => {
    const fetchItems = async () => {
      const db = getFirestore();
      const queryCollection = collection(db, "products");
      const data = await getDocs(queryCollection);
      itemList = data.docs.map((item) => ({ id: item.id, ...item.data() }));
    };

    fetchItems()
      .then(() => suggestItem(itemList))
      .catch(console.error);
  }, []);

  const addSuggestion = (item) => {
    addToCart({ ...item, quantity: 1 });
  };

  function suggestItem(itemList) {
    const max = itemList.length - 1;
    let randomNumber = Math.floor(Math.random() * (max + 1));
    let suggestedItem = itemList[randomNumber];
    setSuggestedItem(
      <SuggestedItem
        key={suggestedItem.title}
        picURL={suggestedItem.picURL}
        title={suggestedItem.title}
        price={suggestedItem.price}
        action={() => addSuggestion(suggestedItem)}
      />
    );
  }
  return (
    <div className="suggestion">
      <h3>Probá esto...</h3>
      <div>{suggestedItem}</div>
    </div>
  );
};

export default SuggestItem;
