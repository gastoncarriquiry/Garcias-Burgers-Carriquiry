import ItemList from "../ItemList/ItemList";
import "./ItemListContainer.css";

function ItemListContainer({ greeting }) {
  return (
    <main>
      <h1>{greeting}</h1>
      <ItemList />
    </main>
  );
}

export default ItemListContainer;
