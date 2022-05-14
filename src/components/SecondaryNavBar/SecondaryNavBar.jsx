import { NavLink } from "react-router-dom";
import "./SecondaryNavBar.css"

const SecondaryNavBar = () => {
  return (
    <nav className="secondary-nav">
      <NavLink to="/menu/hamburguesas">
        <button className="secondary-nav-button">Hamburgesas</button>
      </NavLink>
      <NavLink to="/menu/chivitos">
        <button className="secondary-nav-button">Chivitos</button>
      </NavLink>
      <NavLink to="/menu/milanesas">
        <button className="secondary-nav-button">Milanesas</button>
      </NavLink>
      <NavLink to="/menu/empanadas">
        <button className="secondary-nav-button">Empanadas</button>
      </NavLink>
      <NavLink to="/menu/papas">
        <button className="secondary-nav-button">Papas</button>
      </NavLink>
      <NavLink to="/menu/bebidas">
        <button className="secondary-nav-button">Bebidas</button>
      </NavLink>
    </nav>
  );
};

export default SecondaryNavBar;
