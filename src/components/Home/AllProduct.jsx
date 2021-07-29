import ProductItem from "./ProductItem";

const AllProduct = (props) => {
  return (
    <div className="mx-2 sm:mx-3 md:mx-4 lg:mx-4 xl:mx-4 2xl:mx-5 allproducts grid grid-flow-row-dense grid-cols-2 gap-3 xl:gap-4 lg:gap-4 md:gap-4  sm:gap-4 2xl:gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
      {props.products.map((item) => {
        return (
          <div className="col-span-1">
            <ProductItem product={item} />
          </div>
        );
      })}
    </div>
  );
};

export default AllProduct;
