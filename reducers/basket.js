const initialState = [];
const basket = (state = initialState, action) => {
  switch (action.type) {
    case "ADDTOCART":
      state = [...state, action.payload];
      return state;
      break;

    case "REMOVEFROMCART":
      const newArr = state.filter((item) => item !== action.payload);
      return newArr;
      break;

    default:
      return state;
      break;
  }
};

export default basket;
