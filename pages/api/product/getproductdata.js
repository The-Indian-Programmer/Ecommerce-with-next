import connectDb from "../../../server/database/connection";
import productset from "../../../server/model/productSchema";

connectDb();

export default async (req, res) => {
  try {
    const product = await productset.find();
    res.json(product);
  } catch (error) {
    res.json({ err: error });
  }
};
