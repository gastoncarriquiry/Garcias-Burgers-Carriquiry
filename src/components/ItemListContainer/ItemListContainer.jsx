import "./ItemListContainer.css";

function ItemListContainer({ greeting, children }) {
  return (
    <main>
      <h1>{greeting}</h1>
      {children}
    </main>
  );
}

export default ItemListContainer;
