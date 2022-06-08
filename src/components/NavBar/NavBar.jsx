import "./NavBar.css";
import { useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import BrandLogo from "../BrandLogo/BrandLogo";

function NavBar() {
  const navBar = useRef(null);
  //shrink header onscroll
  const mediaQuery = window.matchMedia("(min-width: 768px)");
  window.onscroll = function () {
    if (mediaQuery.matches) {
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navBar.current.classList.add("smaller");
      } else {
        navBar.current.classList.remove("smaller");
      }
    } else {
      navBar.current.classList.add("mobile");
    }
  };

  //close menu when link is clicked
  const handleClick = () => {
    document.querySelector("#nav").classList.remove("is-active");
    document.querySelector(".links").style.display = "none";
  };

  return (
    <header className="NavBar" ref={navBar}>
      <div className="container">
        <Link to="/" className="Brand-Logo">
          <BrandLogo />
        </Link>
        <div className="menu">
          <HamburgerMenu />
          <nav className="links">
            <NavLink to="/">
              <button onClick={handleClick}>INICIO</button>
            </NavLink>
            <NavLink to="/menu/hamburguesas">
              <button onClick={handleClick}>MENÚ</button>
            </NavLink>
            <NavLink to="/nosotros">
              <button onClick={handleClick}>NOSOTROS</button>
            </NavLink>
            <NavLink to="/contacto">
              <button onClick={handleClick}>CONTACTO</button>
            </NavLink>
          </nav>
          <NavLink className="Cart-Widget" to="/carrito">
            <CartWidget />
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
