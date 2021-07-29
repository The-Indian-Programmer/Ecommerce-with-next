import showLoader from "./showLoader";
import { combineReducers } from "redux";
import userAuth from "./userAuth";
import basket from "./basket";
const rootReducer = combineReducers({
  showLoader,
  userAuth,
  basket,
});

export default rootReducer;
