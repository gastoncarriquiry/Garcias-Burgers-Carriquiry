import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer"

function App() {
  return (
    <>
      <NavBar />
      <ItemListContainer greeting="Bienvenid@ a García's Burgers" />
      <ItemDetailContainer />
    </>
  );
}

export default App;
