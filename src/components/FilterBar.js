import { useDispatch, useSelector } from "react-redux";
import {
  changePriceOrder,
  changeBikeMaker,
  changeBikeColor,
} from "../features/bikes/bikeSlice";
import M from "materialize-css";

const FilterBar = () => {
  const colorList = useSelector((state) => state.bikes.myColors);
  const dispatch = useDispatch();

  const handleOnchangePrice = (e) => {
    dispatch(changePriceOrder({ priceOrder: e.target.value }));
  };

  const handleOnchangeMaker = (e) => {
    dispatch(changeBikeMaker({ bikeMaker: e.target.value }));

    //reset price order select & default option
    resetSelect("priceOrder", "prompt");

    //reset color select & default option
    resetSelect("color-select", "allcolors");
  };

  const handleOnchangeColor = (e) => {
    dispatch(changeBikeColor({ bikeColor: e.target.value }));

    //reset price order select & default option
    resetSelect("priceOrder", "prompt");
  };

  const resetSelect = (selectId, selectDefaultValue) => {
    //reset price order select & default option
    const $select = document.getElementById(selectId);
    $select.value = selectDefaultValue;

    M.FormSelect.init($select, {}); //re-render/re-init Materialize CSS Select
  };

  return (
    <div className="filter-bar container">
      <div className="row">
        <div className="input-field col s12 m4">
          <select id="bike-maker" onChange={(e) => handleOnchangeMaker(e)}>
            <option value="allbikes">All</option>
            <option value="Honda">Honda</option>
            <option value="Suzuki">Suzuki</option>
            <option value="Yamaha">Yamaha</option>
          </select>
          <label>Maker</label>
        </div>

        <div className="input-field col s12 m4">
          <select
            id="priceOrder"
            onChange={(e) => handleOnchangePrice(e)}
            defaultValue={"prompt"}
          >
            <option value="prompt" disabled>
              Filter by price
            </option>
            <option value="increase">Ascending</option>
            <option value="decrease">Descending</option>
          </select>
          <label>Price</label>
        </div>

        <div className="input-field col s12 m4">
          <select
            id="color-select"
            onChange={(e) => handleOnchangeColor(e)}
            defaultValue={"allcolors"}
          >
            <option value="allcolors" disabled>
              Filter by color
            </option>
            {colorList.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <label>Color</label>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
