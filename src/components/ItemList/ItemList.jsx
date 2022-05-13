import Item from "../Item/Item";
import "./ItemList.css";

const ItemList = ({ items }) => {
  return items.map((item) => (
    <Item
      key={item.id}
      item={item}
    />
  ));
};

export default ItemList;
