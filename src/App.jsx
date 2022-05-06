import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemCount from "../src/components/ItemCount/ItemCount";

function App() {
  return (
    <>
      <NavBar />
      <ItemListContainer greeting="Bienvenid@ a García's Burgers">
        <ItemCount stock={10} initial={1} />
      </ItemListContainer>
    </>
  );
}

export default App;
