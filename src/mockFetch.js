import { itemList } from "./data/data";

export const mockFetch = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const query = id ? itemList.find((item) => item.id === id) : itemList;
      resolve(query);
    }, 2000);
  });
};
