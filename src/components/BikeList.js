import BikeItem from "./BikeItem";
import { useSelector } from "react-redux";

const BikeList = () => {
  const bikes = useSelector((state) => state.bikes.mybikes);

  return (
    <div className="bike-list">
      <div className="row">
        {bikes.map((b) => (
          <BikeItem
            key={b.id}
            motionTime={b.id}
            make={b.make}
            name={b.name}
            engine={b.engine}
            colors={b.color}
            intro={b.intro}
            price={b.price}
            pic={b.pic}
          ></BikeItem>
        ))}
      </div>
    </div>
  );
};

export default BikeList;
