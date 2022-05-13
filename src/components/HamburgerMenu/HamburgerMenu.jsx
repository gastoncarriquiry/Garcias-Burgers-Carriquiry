import "./HamburgerMenu.css";

function HamburgerMenu() {
  const hamburgerAction = () => {
    const nav = document.querySelector("#nav");
    nav.classList.toggle("is-active");
    if(nav.classList.contains("is-active")) {
      document.querySelector(".links").style.display = 'block';
    } else {
      document.querySelector(".links").style.display = 'none';
    }
  };

  return (
    <button className="nav-toggle hamburger--collapse hamburger" id="nav" type="button" onClick={hamburgerAction}>
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </button>
  );
}

export default HamburgerMenu;
