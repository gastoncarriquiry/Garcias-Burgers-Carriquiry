import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Home from "./layout/Home/Home";
import Cart from "./layout/Cart/Cart";
import Error404 from "./layout/Error404/Error404";
import Footer from "./layout/Footer/Footer";
import About from "./layout/About/About";
import Contact from "./layout/Contact/Contact";
import { CartContextProvider } from "./context/CartContext";
import PaymentForm from "./components/PaymentForm/PaymentForm";

function App() {
  return (
    <BrowserRouter>
      <CartContextProvider>
        <>
          <NavBar />
          <Routes>
            {/* STATIC PAGES */}
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
            {/* MENUS */}
            {/* WHOLE MENU */}
            <Route path="/menu" element={<ItemListContainer />} />
            {/* MENU BY CATEGORIES */}
            <Route path="/menu/:category" element={<ItemListContainer />} />
            {/* PRODUCT DETAIL */}
            <Route path="/menu/:category/:id" element={<ItemDetailContainer />} />
            <Route path="/carrito" element={<Cart />} />
            {/* PAYMENT */}
            <Route path="/pago" element={<PaymentForm />} />
            {/* ERROR 404 */}
            <Route path="/error404" element={<Error404 />} />
            <Route path="/*" element={<Navigate to="/error404" />} />
          </Routes>
          <Footer />
        </>
      </CartContextProvider>
    </BrowserRouter>
  );
}

export default App;
