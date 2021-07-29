import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProductById } from "../../server/routes/productData";
import { showLoader } from "../../store/index";
import { useDispatch } from "react-redux";
import { ShoppingBagIcon } from "@heroicons/react/solid";
const ProductPage = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const isActive = (index) => {
    if (tab === index) {
      return " rounded-lg border-gray-800";
    } else {
      return "rounded-xl";
    }
  };
  const [product, setProduct] = useState({
    category: "",
    checked: false,
    content: "",
    description: "",
    image: [],
    images: [
      "https://i.pinimg.com/originals/10/b2/f6/10b2f6d95195994fca386842dae53bb2.png",
    ],
    inStock: 0,
    originalprice: "",
    price: "",
    question: [],
    reviews: [],
    sold: 0,
    title: "",
    id: "",
  });
  const router = useRouter();
  const { id } = router.query;
  const getproductData = async (id) => {
    const response = await getProductById("product/getproductbyid", id);
    setProduct(JSON.parse(response));
    dispatch(showLoader(false));
  };

  getproductData(id);
  dispatch(showLoader(true));
  useEffect(() => {
    getproductData(id);
    dispatch(showLoader(true));
  }, []);

  return (
    <div className="productview mt-6 container mx-auto sm:mx-3 md:mx-4 lg:mx-4 xl:mx-4 2xl:mx-5 allproducts grid grid-flow-row-dense grid-cols-1  xl:gap-4 lg:gap-4 md:gap-4  sm:gap-4 2xl:gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
      <div className="productimage col-span-1 px-2 bg-green-50">
        <div className="thumbnailimage w-full  py-2">
          <img
            src={product.images[tab].url}
            className="featured_image h-60 rounded-lg w-full transform hover:scale-105"
            alt=""
          />
        </div>
        <div className="allimage mt-2 flex w-full h-32 overflow-x-scroll ">
          {product.images.map((item, index) => {
            return (
              <img
                className={`h-28 w-32 mx-1 cursor-pointer ${isActive(index)}`}
                src={item.url}
                alt=""
                onClick={() => setTab(index)}
              />
            );
          })}
        </div>
      </div>
      <div className="productimage col-span-2 px-3 ">
        <h2 className="product_title font-bold text-2xl">
          {product.title.toUpperCase()}
        </h2>
        <p className="rating text-yellow-600 text-2xl">
          &#9733; &#9733; &#9733; &#9733; &#9733;
        </p>
        <p className="description">
          {product.description} Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Dolorum voluptatibus quam porro fugiat quo quaerat
          ex nihil voluptates nesciunt aliquam?
        </p>

        <div className="product_stock_detail my-2">
          <p className="stock font-extrabold text-xl text-red-800">
            Only {product.inStock - product.sold} left in stock
          </p>
        </div>
        <div className="price flex flex-col">
          <h4 className="today_price font-bold">
            <span className="font-extrabold text-xl">Price : $ </span>
            {product.price}
          </h4>
          <p className="originalprice line-through text-gray-400">
            <span className="font-extrabold text-lg ">Original Price : $ </span>
            {product.originalprice}
          </p>
        </div>
        <div className="action_button mt-5">
          <button className="bg-yellow-400 py-2 btn hover:bg-yellow-500 text-black border-0 rounded-none w-full">
            Add To Cart
          </button>
          <p className="text-sm my-2 font-bold flex items-center">
            <ShoppingBagIcon className="h-5 inline-block mr-2" />
            {product.sold} people baught this item
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
