import connectDb from "../../../server/database/connection";
import userSchema from "../../../server/model/userSchema";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await signin(req, res);
      break;
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const userExist = await userSchema.findOne({ email: email });
    if (userExist === null) {
      return res.status(422).json({ err: "Email does not exist" });
    }

    if (userExist.password !== password) {
      return res.status(422).json({ err: "Password donot match" });
    }

    res.json({ user: userExist, msg: "Registration Success" });
  } catch (error) {
    console.log(error);
  }
};
