import connectDb from "../../../server/database/connection";
import productset from "../../../server/model/productSchema";
import jwt from "jsonwebtoken";
connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await getproduct(req, res);
      break;
  }
};

const getproduct = async (req, res) => {
  try {
    const product = await productset.findOne({ _id: req.body.productid });
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};
