import React, { useState, useEffect } from "react";
import Item from "../Item/Item";
import { itemList } from "../../data/data";
import { Waveform } from "@uiball/loaders";
import './ItemList.css'

const mockFetch = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(itemList);
  }, 2000);
});

const ItemList = () => {
  //   console.log(items);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockFetch
      .then((res) => setItems(res))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="item-list">
      {loading ? (
          <div className="loader">
              <Waveform color="white" />
          </div>
      ) : (
        items.map((item) => (
          <Item
            key={item.id}
            title={item.title}
            description={item.description}
            picURL={item.picURL}
            price={item.price}
            disponible={item.disponible}
            initial={item.initial}
          />
        ))
      )}
    </section>
  );
};

export default ItemList;
