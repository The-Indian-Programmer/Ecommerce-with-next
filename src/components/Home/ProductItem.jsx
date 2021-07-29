import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { show } from "../../../pages/register";
import { addToCart, removeFromCart } from "../../../store/index";
const ProductItem = ({ product }) => {
  const basket = useSelector((state) => state.basket);
  let value = 0;
  let arr = [];
  const dispatch = useDispatch();
  const addItemToBasket = async (item) => {
    for (let i = 0; i < basket.length; i++) {
      const element = basket[i];
      if (element._id === item._id) {
        value = 1;
        break;
      }
    }
    if (value === 0) {
      dispatch(
        addToCart({
          _id: item._id,
          images: item.images,
          reviews: item.reviews,
          inStock: item.inStock,
          sold: item.sold,
          question: item.question,
          checked: item.checked,
          title: item.title,
          price: item.price,
          description: item.description,
          content: item.content,
          category: item.category,
          quantity: 1,
        })
      );
      show("Succes", "Added to cart", "bg-green-500");
    } else {
      show("", "Already is in cart", "bg-yellow-500");
    }
  };
  console.log(value);
  return (
    <div className="product px-6 py-6 shadow-2xl">
      <div class="rounded overflow-hidden">
        <img
          class="w-full h-16 sm:h-32 md:h-32 xl:h-32 lg:h-32 2xl:h-32 "
          src={product.images[0].url}
          alt="Mountain"
        />
        <div class="">
          <Link href={`/product/${product._id}`}>
            <div class="font-bold my-1 text-xs cursor-pointer sm:text-xs md:text-sm xl:text-lg 2xl:text-lg uppercase ">
              {product.title}
            </div>
          </Link>
          <p class="text-gray-700 text-base sm:text-sm md:text-sm lg:text-sm xl:text-sm hidden sm:block md:block lg:block xl:block 2xl:block">
            {product.description.substring(0, 50)}.....
          </p>
        </div>
        <div className="detail flex flex-row">
          <div className="price-detail flex-auto flex flex-col justify-center">
            <p className="price flex-auto h-10 text-blue-500 text-xs lg:text-sm md:text-sm sm:text-sm xl:text-sm 2xl:text-sm">
              <span className="font-bold">&#8377;</span> 200 /-
            </p>
            <p className="text-xs  line-through original_price text-gray-700 hidden sm:block md:block lg:block xl:block 2xl:block">
              <span>&#8377;</span>450 /-
            </p>
          </div>
          <div className="rating text-sm flex-1 flex justify-end">
            <p className="rating_text text-red-400">
              <span className="font-semibold">0.0</span>&#9733;
            </p>
          </div>
        </div>
        <div className="actionbutton flex flex-row">
          <button
            onClick={() => router.push(`/product/${product._id}`)}
            className="bg-gray-800 rounded py-1 flex-auto text-white text-xs lg:text-sm md:text-sm sm:text-sm xl:text-sm 2xl:text-sm"
          >
            View
          </button>
          <button
            onClick={() => addItemToBasket(product)}
            className="bg-gray-800 rounded text-white py-1 ml-3 flex-auto hidden sm:hidden md:hidden xl:block lg:block 2xl:block"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
