import AllProduct from "./AllProduct";

const HomePage = (props) => {
  return (
    <div className="homepage">
      <AllProduct products={props.products} />
    </div>
  );
};

export default HomePage;
