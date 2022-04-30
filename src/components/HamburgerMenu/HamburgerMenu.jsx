import "./HamburgerMenu.css";

function HamburgerMenu() {
  const hamburgerAction = () => {
    document.addEventListener("DOMContentLoaded", function () {
      document
        .querySelector("#nav")
        .addEventListener("click", () =>
          document.querySelector("#nav").classList.toggle("is-active")
        );
    });
  };
  return (
    <button
      className="nav-toggle hamburger--collapse hamburger"
      id="nav"
      type="button"
      onClick={hamburgerAction()}
    >
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </button>
  );
}

export default HamburgerMenu;
