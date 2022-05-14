import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Error404 from "./components/Error404/Error404";
//TODO: HOME, ABOUT page, error404, contact form, Footer
function App() {
  return (
    <BrowserRouter>
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* WHOLE MENU */}
          <Route
            path="/menu"
            element={<ItemListContainer />}
          />
          {/* MENU BY CATEGORIES */}
          <Route path="/menu/:category" element={<ItemListContainer />} />
          {/* PRODUCT DETAIL */}
          <Route path="/menu/:category/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/404" element={<Error404 />} />

          {/* <Route path="/*" element={<Navigate to="/" replace/>} /> PARA LOGIN USAR EL ATRIBUTO REPLACE */}
          <Route path="/*" element={<Navigate to="/404" />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
