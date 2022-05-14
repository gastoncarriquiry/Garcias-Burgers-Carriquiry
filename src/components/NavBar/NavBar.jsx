import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import BrandLogo from "../BrandLogo/BrandLogo";

function NavBar() {
  //ONSCROLL SHRINK HEADER
  const mediaQuery = window.matchMedia("(min-width: 768px)");
  window.onscroll = function () {
    if (mediaQuery.matches) {
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.querySelector(".Nav-Logo").style.width = "6%";
        document.querySelector(".container").style.paddingBottom = "0.5em";
        document.querySelector(".NavBar").style.height = "3em";
        document.querySelector(".NavBar").style.backgroundColor = "rgba(0, 0, 0, 0.87)";
      } else {
        document.querySelector(".Nav-Logo").style.width = "10%";
        document.querySelector(".container").style.paddingBottom = "0.5em";
        document.querySelector(".NavBar").style.height = "5em";
        document.querySelector(".NavBar").style.backgroundColor = "black";
      }
    } else {
      document.querySelector(".Nav-Logo").style.width = "25%";
      document.querySelector(".container").style.paddingBottom = "0.5em";
      document.querySelector(".NavBar").style.height = "5em";
      document.querySelector(".NavBar").style.backgroundColor = "black";
    }
  };
  return (
    <header className="NavBar">
      <div className="container">
        <Link to="/" className="Brand-Logo">
          <BrandLogo />
        </Link>
        <div className="menu">
          <HamburgerMenu />
          <nav className="links">
            <NavLink to="/">
              <button>INICIO</button>
            </NavLink>
            <NavLink to="/menu">
              <button>MENÚ</button>
            </NavLink>
            <NavLink to="/404">
              <button>NOSOTROS</button>
            </NavLink>
            <NavLink to="/404">
              <button>CONTACTO</button>
            </NavLink>
          </nav>
          <NavLink className="Cart-Widget" to="/cart">
            <CartWidget />
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
