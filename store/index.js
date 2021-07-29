export const showLoader = (data) => {
  return {
    type: "SHOWLOADER",
    payload: data,
  };
};

export const setUserAuth = (data) => {
  return {
    type: "SETUSERAUTH",
    payload: data,
  };
};

export const addToCart = (data) => {
  return {
    type: "ADDTOCART",
    payload: data,
  };
};

export const removeFromCart = (data) => {
  return {
    type: "REMOVEFROMCART",
    payload: data,
  };
};
