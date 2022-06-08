//THIS DOCUMENT CONTAINS FUNCTIONS USEFUL FOR THE DEVELOPMENT AND MAINTENANCE PART OF THE PROJECT
//#region UPLOAD ITEMS TO FIRESTORE
//IMPORTS REQUIRED
import { getFirestore, setDoc, doc } from "firebase/firestore";
import Button from "../Button/Button";
import { itemList } from "../../data/data";
//UPLOAD ALL ITEMS FROM ../data/data.js
const uploadItems = () => {
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
};
//COMPONENT
//BUTTON TO UPLOAD ALL ITEMS IN ../data/data.js
<Button text="Upload items" click={uploadItems} />;
//#endregion

//#region MOCK FETCH
import { itemList } from "../data/data";

export const mockFetch = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const query = id ? itemList.find((item) => item.id === id) : itemList;
      resolve(query);
    }, 500);
  });
};

//#endregion

//#region
//#endregion
