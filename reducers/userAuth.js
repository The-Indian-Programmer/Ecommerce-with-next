const initialState = {};
const userAuth = (state = initialState, action) => {
  switch (action.type) {
    case "SETUSERAUTH":
      state = action.payload;
      return state;
      break;

    default:
      return state;
      break;
  }
};

export default userAuth;
