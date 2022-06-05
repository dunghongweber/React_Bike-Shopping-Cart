import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { removeBikeFromCart } from "../../features/bikes/bikeSlice";

const CartItem = ({ id, make, name, engine, color, price, pic, quantity }) => {
  const dispatch = useDispatch();
  const handleOnClick = (e) => {
    e.preventDefault();
    dispatch(removeBikeFromCart({ bId: id }));
  };

  const motionLi = {
    hidden: {
      x: "-10vh",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };
  return (
    <motion.li
      className="cart-item collection-item avatar"
      variants={motionLi}
      initial="hidden"
      animate="visible"
    >
      <img src={pic} alt="mini" className="circle" />
      <strong className="title">
        {make} {name} {engine}
      </strong>

      <p>
        Quantity: <strong>{quantity}</strong> <br />
        Color: <strong>{color}</strong>
        <br />
        Price: {price.toLocaleString("en-US")}
      </p>
      <a href="!#" onClick={(e) => handleOnClick(e)}>
        <i className="material-icons red-text">delete</i>
      </a>
    </motion.li>
  );
};

export default CartItem;
