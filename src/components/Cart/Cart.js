import CartItem from "./CartItem";
import M from "materialize-css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { emptyCart } from "../../features/bikes/bikeSlice";

const Cart = () => {
  // init materialize CSS SideNav
  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".sidenav");
      M.Sidenav.init(elems, { edge: "right" });
    });
  }, []);

  const bikes = useSelector((state) => state.bikes.cart);

  const dispatch = useDispatch();
  const handleEmptyCart = () => {
    dispatch(emptyCart());
  };

  return (
    <div className="my-cart">
      <h5 className="center">Your Cart</h5>
      <ul className="collection">
        {bikes.map((b) => (
          <CartItem
            key={b.id}
            id={b.id}
            make={b.make}
            name={b.name}
            engine={b.engine}
            color={b.color}
            price={b.price}
            pic={b.pic}
            quantity={b.quantity}
          ></CartItem>
        ))}
      </ul>

      <div className="cart-total">
        <p>
          <strong style={{ textDecoration: "underline" }}>Total:</strong>{" "}
          {bikes.length !== 0
            ? bikes
                .reduce((accumulator, currentValue) => {
                  return (
                    accumulator + currentValue.quantity * currentValue.price
                  );
                }, 0)
                .toLocaleString("en-US")
            : 0}{" "}
          VND
        </p>
        <button
          className="btn red"
          style={{ fontSize: "12px" }}
          onClick={() => handleEmptyCart()}
          disabled={bikes.length !== 0 ? false : true}
        >
          <i className="material-icons left">remove_shopping_cart</i>Cancel
        </button>
      </div>
    </div>
  );
};

export default Cart;
