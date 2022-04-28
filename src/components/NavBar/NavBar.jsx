import "./NavBar.css";
// import logo from '../../assets/logo.png';
import "boxicons";

function NavBar() {
  const logo = "https://svgshare.com/i/gdN.svg";
  return (
    <nav className="NavBar">
      <div className="container">
        <img src={logo} className="Nav-Logo" alt="Logo"/>
        <div className="links">
          <a href="http://localhost:3000/" className="active">INICIO</a>
          <a href="http://localhost:3000/">MENÚ</a>
          <a href="http://localhost:3000/">NOSOTROS</a>
          <a href="http://localhost:3000/">CONTACTO</a>
          //TODO: crear CartWidget -- hacer del carrito un componente
          //TODO: cambiar los iconos
          <a href="http://localhost:3000/">
            <box-icon name="cart-alt" color="#eaeaea"></box-icon>
          </a>
          <a href="http://localhost:3000/">
            <box-icon name="search" color="#eaeaea"></box-icon>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
