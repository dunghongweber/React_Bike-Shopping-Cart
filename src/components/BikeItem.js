import { useDispatch } from "react-redux";
import { openModal } from "../features/bikes/bikeSlice";
import M from "materialize-css";
import { useEffect } from "react";
import { motion } from "framer-motion";

const BikeItem = ({
  motionTime,
  make,
  name,
  engine,
  colors,
  intro,
  price,
  pic,
}) => {
  // auto init all, for easy use
  useEffect(() => {
    M.AutoInit();
    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, { opacity: 0 });
  }, []);

  const dispatch = useDispatch();

  const handleOnClick = (e) => {
    e.preventDefault();
    dispatch(
      openModal({
        make: make,
        name: name,
        engine: engine,
        colors: colors,
        intro: intro,
        price: price,
        pic: pic,
      })
    );
  };

  return (
    <motion.div
      className="bike-item"
      initial={{ y: "-300vh", opacity: 0 }}
      animate={{
        y: "0",
        opacity: 1,
        transition: { duration: motionTime / 2 },
      }}
    >
      <div className="col s12 m6 l4">
        <div className="card hoverable" onClick={(e) => handleOnClick(e)}>
          <div className="card-image">
            <img src={pic} alt="motorcycle" className="card-pic" />
            <span className="card-price blue white-text">
              Price: {price.toLocaleString("en-US")} VNĐ
            </span>
            <button className="btn-floating halfway-fab waves-effect waves-light blue hide-on-small-only">
              <i className="material-icons">add</i>
            </button>
          </div>
          <div className="card-content blue-grey lighten-4">
            <span className="card-title">
              {make} {name} {engine}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BikeItem;
