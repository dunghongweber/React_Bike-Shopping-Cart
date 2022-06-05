import { createSlice } from "@reduxjs/toolkit";
import hondawave from "../../assets/hondawave.jpg";
import hondaairblade from "../../assets/hondaairblade.jpg";
import yamahaexciter from "../../assets/yamahaexciter.jpg";
import yamahalatte from "../../assets/yamahalatte.png";
import yamahajanus from "../../assets/yamahajanus.png";
import suzukihayate from "../../assets/suzukihayate.jpg";

const bikeList = [
  {
    id: 1,
    make: "Honda",
    name: "Wave Alpha",
    engine: 110,
    color: ["Red", "Blue", "White"],
    intro:
      "Beautiful bike at a resonable price. What are you waiting for, get one for yourself today!",
    price: 20000000,
    pic: hondawave,
  },
  {
    id: 2,
    make: "Honda",
    name: "Air Blade",
    engine: 150,
    color: ["Red", "Blue"],
    intro:
      "Beautiful bike at a resonable price. What are you waiting for, get one for yourself today!",
    price: 50000000,
    pic: hondaairblade,
  },
  {
    id: 3,
    make: "Yamaha",
    name: "Exciter",
    engine: 150,
    color: ["Red", "Blue", "Yellow"],
    intro:
      "Beautiful bike at a resonable price. What are you waiting for, get one for yourself today!",
    price: 50000000,
    pic: yamahaexciter,
  },
  {
    id: 4,
    make: "Yamaha",
    name: "Janus",
    engine: 125,
    color: ["Red", "Blue", "Pink"],
    intro:
      "Beautiful bike at a resonable price. What are you waiting for, get one for yourself today!",
    price: 30000000,
    pic: yamahajanus,
  },
  {
    id: 5,
    make: "Yamaha",
    name: "Latte",
    engine: 125,
    color: ["Black", "White"],
    intro:
      "Beautiful bike at a resonable price. What are you waiting for, get one for yourself today!",
    price: 40000000,
    pic: yamahalatte,
  },
  {
    id: 6,
    make: "Suzuki",
    name: "Hayate",
    engine: 125,
    color: ["Black"],
    intro:
      "Beautiful bike at a resonable price. What are you waiting for, get one for yourself today!",
    price: 25000000,
    pic: suzukihayate,
  },
];

//color list init
const colorList = [];
bikeList.forEach((b) => {
  b.color.forEach((c) => {
    if (!colorList.includes(c)) {
      colorList.push(c);
    }
  });
});

export const bikeSlice = createSlice({
  name: "bikes",
  initialState: {
    mybikes: bikeList,
    cart: [],
    bikeMaker: "allbikes",
    priceOrder: "",
    myColors: colorList.sort(),
    myModal: {
      modalOpen: false,
      bikeDetail: null,
    },
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changePriceOrder: (state, action) => {
      const sortedArray = [...state.mybikes];
      if (action.payload.priceOrder === "increase") {
        state.mybikes = sortedArray.sort((a, b) => a.price - b.price);
      } else {
        state.mybikes = sortedArray.sort((a, b) => b.price - a.price);
      }
    },
    changeBikeMaker: (state, action) => {
      const filteredArray = [...bikeList];
      state.bikeMaker = action.payload.bikeMaker;

      switch (action.payload.bikeMaker) {
        case "Honda":
          state.mybikes = filteredArray.filter((b) => b.make === "Honda");
          break;
        case "Suzuki":
          state.mybikes = filteredArray.filter((b) => b.make === "Suzuki");
          break;
        case "Yamaha":
          state.mybikes = filteredArray.filter((b) => b.make === "Yamaha");
          break;
        default:
          state.mybikes = filteredArray;
          break;
      }
    },
    changeBikeColor: (state, action) => {
      const filteredArray = [...bikeList];

      if (action.payload.bikeColor === "allcolors") {
        state.mybikes = filteredArray;
      } else if (state.bikeMaker === "allbikes") {
        state.mybikes = filteredArray.filter((b) =>
          b.color.includes(action.payload.bikeColor)
        );
      } else {
        state.mybikes = filteredArray.filter(
          (b) =>
            b.color.includes(action.payload.bikeColor) &&
            b.make === state.bikeMaker
        );
      }
    },
    addBikeToCart: (state, action) => {
      let newId; //new Id for cart item
      if (state.cart.length !== 0) {
        let ids = state.cart.map((b) => {
          return b.id;
        });

        newId = Math.max(...ids) + 1;
      } else {
        newId = 1;
      }

      let newBike = {
        id: newId,
        make: action.payload.make,
        name: action.payload.name,
        engine: action.payload.engine,
        color: action.payload.color,
        price: action.payload.price,
        pic: action.payload.pic,
        quantity: 1,
      };

      //check if product already existed in cart
      let existed = state.cart.find(
        (b) =>
          b.make === newBike.make &&
          b.name === newBike.name &&
          b.engine === newBike.engine &&
          b.color === newBike.color &&
          b.price === newBike.price
      );

      //update quantity of existing product or add new product
      if (existed) {
        existed.quantity += 1;
      } else {
        state.cart.push(newBike);
      }

      //reset modal
      state.myModal.modalOpen = false;
      state.myModal.bikeDetail = null;
    },
    removeBikeFromCart: (state, action) => {
      //find the item user wants to remove
      let removedItem = state.cart.find(
        (item) => item.id === action.payload.bId
      );

      //reduce deleted item quantity or remove it completely
      if (removedItem.quantity > 1) {
        removedItem.quantity -= 1;
      } else {
        let deletedCart = state.cart.filter(
          (item) => item.id !== action.payload.bId
        );
        state.cart = deletedCart;
      }
    },
    emptyCart: (state, action) => {
      state.cart = [];
    },
    openModal: (state, action) => {
      state.myModal.modalOpen = true;

      let bikeDetail = {
        make: action.payload.make,
        name: action.payload.name,
        engine: action.payload.engine,
        colors: action.payload.colors,
        intro: action.payload.intro,
        price: action.payload.price,
        pic: action.payload.pic,
      };

      state.myModal.bikeDetail = bikeDetail;
    },
    closeModal: (state, action) => {
      state.myModal.modalOpen = false;
      state.myModal.bikeDetail = null;
    },
  },
});

export const {
  changePriceOrder,
  changeBikeMaker,
  changeBikeColor,
  addBikeToCart,
  removeBikeFromCart,
  emptyCart,
  openModal,
  closeModal,
} = bikeSlice.actions;

export default bikeSlice.reducer;
