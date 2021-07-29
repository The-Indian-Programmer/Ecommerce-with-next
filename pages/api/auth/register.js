import connectDb from "../../../server/database/connection";
import userSchema from "../../../server/model/userSchema";
import registerformvalidation from "../../../server/validation/registrationformvalidation";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await register(req, res);
      break;
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, cpassword } = req.body;
    const error_message = registerformvalidation(
      name,
      email,
      password,
      cpassword
    );
    if (error_message) return res.status(400).json({ err: error_message });

    const userExist = await userSchema.findOne({ email: email });
    if (userExist) return res.status(422).json({ err: "Email already exists" });
    const newUser = new userSchema({
      name,
      email,
      password,
      cpassword,
    });
    /// generate the tokenhere
    const token = await newUser.generateAuthToken();
    // // Set
    // setCookie({ res }, "auth", token, {
    //   maxAge: 30 * 24 * 60 * 60,
    // });
    await newUser.save();
    res.json({ token: token, msg: "Registration Success" });
  } catch (error) {
    console.log(error);
  }
};
