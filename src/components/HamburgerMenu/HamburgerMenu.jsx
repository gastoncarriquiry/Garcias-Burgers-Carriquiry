import "./HamburgerMenu.css";
import { useRef } from "react";

function HamburgerMenu() {
  const nav = useRef(null);
  const hamburgerAction = () => {
    nav.current.classList.toggle("is-active");
    if (nav.current.classList.contains("is-active")) {
      document.querySelector(".links").style.display = "block";
    } else {
      document.querySelector(".links").style.display = "none";
    }
  };

  document.addEventListener("click", (evt) => {
    let checkClickInNav = nav.current.contains(evt.target);
    if (!checkClickInNav && nav.current.classList.contains("is-active")) {
      nav.current.classList.remove("is-active");
      document.querySelector(".links").style.display = "none";
    }
  });

  return (
    <button
      className="nav-toggle hamburger--collapse hamburger"
      id="nav"
      ref={nav}
      type="button"
      onClick={hamburgerAction}
    >
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </button>
  );
}

export default HamburgerMenu;
