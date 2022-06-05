import React from "react";
import BikeList from "./components/BikeList";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart/Cart";
import M from "materialize-css";
import { useEffect } from "react";
import FilterBar from "./components/FilterBar";
import Modal from "./components/BikeDetails/Modal";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

function App() {
  // auto init all, for easy use
  useEffect(() => {
    M.AutoInit();
  }, []);

  const openModalMain = useSelector((state) => state.bikes.myModal.modalOpen);

  return (
    <div className="App">
      <NavBar></NavBar>
      <div className="row">
        <div className="col s12 m10">
          <FilterBar></FilterBar>
          <BikeList></BikeList>
        </div>
        <div className="col s12 m2 hide-on-med-and-down">
          <Cart></Cart>
        </div>
      </div>

      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {openModalMain && <Modal></Modal>}
      </AnimatePresence>
    </div>
  );
}

export default App;
