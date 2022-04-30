import "./ItemListContainer.css";

function ItemListContainer({ greeting = 'Greetings!'}) {
  return (
    <main>
      <h1>{greeting}</h1>
    </main>
  );
}

export default ItemListContainer;
