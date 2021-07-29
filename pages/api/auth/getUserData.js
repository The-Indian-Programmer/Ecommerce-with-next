import connectDb from "../../../server/database/connection";
import userSchema from "../../../server/model/userSchema";
import jwt from "jsonwebtoken";
connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await getData(req, res);
      break;
  }
};

const getData = async (req, res) => {
  try {
    if (!req.body.userAuthEcommerce) {
      return res.json({ err: "Please Login to continue" });
    }
    const verifyUser = await jwt.verify(
      req.body.userAuthEcommerce,
      process.env.TOKEN_SECRET_KEY
    );

    const users = await userSchema.findOne({ _id: verifyUser._id });

    res.json(users);
  } catch (error) {
    console.log(error);
  }
};
