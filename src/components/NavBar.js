import M from "materialize-css";
import { useEffect } from "react";
import Cart from "./Cart/Cart";

const NavBar = () => {
  // init materialize CSS SideNav
  useEffect(() => {
    M.AutoInit();
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".sidenav");
      M.Sidenav.init(elems, { edge: "right" });
    });
  }, []);

  return (
    <div>
      <nav>
        <div className="nav-wrapper blue">
          <a href="/" className="brand-logo center">
            GOOD BIKE
          </a>
          <ul id="nav-mobile" className="right">
            <li>
              <a href="/#" className="hide-on-med-and-down">
                Cart
              </a>
            </li>
            <a
              href="/#"
              data-target="slide-out"
              className="sidenav-trigger show-on-medium-and-down"
            >
              <i className="material-icons">shopping_cart</i>
            </a>
          </ul>
        </div>
      </nav>

      <div id="slide-out" className="sidenav">
        <Cart></Cart>
      </div>
    </div>
  );
};

export default NavBar;
