const initialState = false;
const showLoader = (state = initialState, action) => {
  switch (action.type) {
    case "SHOWLOADER":
      state = action.payload;
      return state;
      break;

    default:
      return state;
      break;
  }
};

export default showLoader;
