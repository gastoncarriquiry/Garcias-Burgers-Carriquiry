import { useState, useEffect } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { Waveform } from "@uiball/loaders";
import { mockFetch } from "../../mockFetch";

const ItemDetailContainer = () => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);

  //const {itemID} = useParams();

  useEffect(() => {
    // mockFetch(itemID)
    mockFetch('1')
      .then((res) => setItem(res))
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  }, []);

  return (
    <section className="item-detail-container">
      {loading ? (
        <div className="loader">
          <Waveform color="white" />
        </div>
      ) : (
        <ItemDetail key={item.id} item={item} />
      )}
    </section>
  );
};

export default ItemDetailContainer;
