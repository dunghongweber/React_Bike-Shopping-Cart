import { motion } from "framer-motion";
import "./Modal.css";
import M from "materialize-css";
import { useEffect, useState } from "react";
import { closeModal, addBikeToCart } from "../../features/bikes/bikeSlice";
import { useDispatch, useSelector } from "react-redux";

const Modal = () => {
  // auto init all, for easy use
  //in this case, this initialize the materialize CSS select
  useEffect(() => {
    M.AutoInit();
  }, []);

  const modalDetail = useSelector((state) => state.bikes.myModal.bikeDetail);

  const dispatch = useDispatch();

  const handleOnClickCancel = () => {
    dispatch(closeModal());
  };

  const [bikeColor, setBikeColor] = useState("");

  const handleOnClickBuy = () => {
    dispatch(
      addBikeToCart({
        make: modalDetail.make,
        name: modalDetail.name,
        engine: modalDetail.engine,
        color: bikeColor,
        price: modalDetail.price,
        pic: modalDetail.pic,
      })
    );
  };

  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  return (
    <motion.div
      className="modal-custom modal-custom-l"
      onClick={(e) => e.stopPropagation()}
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="modal-content">
        {modalDetail ? (
          <div className="row">
            <div className="col s12 l6">
              <h4>
                {modalDetail.make} {modalDetail.name} {modalDetail.engine}
              </h4>
              <img src={modalDetail.pic} alt="detail-modal"></img>
            </div>
            <div className="col s12 l6">
              <div className="row">
                <h5>Price: {modalDetail.price.toLocaleString("en-US")} VND</h5>
              </div>
              <div className="row">{modalDetail.intro}</div>

              <div className="row">
                <select
                  id="modal-select-color"
                  onChange={(e) => setBikeColor(e.target.value)}
                  defaultValue={"prompt"}
                >
                  <option value="prompt" disabled>
                    Pick color
                  </option>
                  {modalDetail.colors.map((c) => (
                    <option value={c} key={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="row">
                <div className="col s6">
                  <button
                    className="btn red"
                    onClick={() => handleOnClickCancel()}
                  >
                    Close
                  </button>
                </div>
                <div className="col s6">
                  <button
                    className="btn"
                    onClick={() => handleOnClickBuy()}
                    disabled={!bikeColor}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p>No Data</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Modal;
