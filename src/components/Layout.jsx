import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import UserLoader from "./UserLoader";

const Layout = ({ children }) => {
  const loaderState = useSelector((state) => state.showLoader);

  return (
    <div>
      <Header />
      {loaderState ? <UserLoader /> : ""}
      {children}
    </div>
  );
};

export default Layout;
