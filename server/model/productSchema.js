const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    originalprice: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    reviews: {
      type: Array,
      default: false,
    },
    instock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    question: {
      type: Array,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const productset =
  mongoose.models.products || mongoose.model("products", productSchema);
export default productset;
