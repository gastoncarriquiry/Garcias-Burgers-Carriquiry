import "./HamburgerMenu.css";
import { useRef } from "react";

//TODO: close hamburger menu when navigated or click outside
function HamburgerMenu() {
  const nav = document.querySelector("#nav");
  const hamburgerAction = () => {
    nav.classList.toggle("is-active");
    if (nav.classList.contains("is-active")) {
      document.querySelector(".links").style.display = "block";
    } else {
      document.querySelector(".links").style.display = "none";
    }
  };

  document.addEventListener("click", (evt) => {
    let checkClickInNav = nav.contains(evt.target);
    if (!checkClickInNav && nav.classList.contains("is-active")) {
      document.querySelector("#nav").classList.remove("is-active");
      document.querySelector(".links").style.display = "none";
    }
  });

  return (
    <button
      className="nav-toggle hamburger--collapse hamburger"
      id="nav"
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
