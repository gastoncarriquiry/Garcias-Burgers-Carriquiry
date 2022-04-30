import "./NavBar.css";
import CartWidget from "../CartWidget/CartWidget";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

function NavBar() {
  const logo = "https://svgshare.com/i/gdN.svg";
  return (
    <header className="NavBar">
      <div className="container">
        <img src={logo} className="Nav-Logo" alt="García's Burgers" />
        <div className="menu">
          <HamburgerMenu />
          <nav className="links">
            <button className="active">INICIO</button>
            <button>MENÚ</button>
            <button>NOSOTROS</button>
            <button>CONTACTO</button>
          </nav>
          <CartWidget />
        </div>
      </div>
    </header>
  );
}

export default NavBar;
