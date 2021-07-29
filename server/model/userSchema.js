const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    root: {
      type: String,
      default: "user",
    },
    role: {
      type: String,
      default: false,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/da4nd5uif/image/upload/v1627239371/samples/photo-1472099645785-5658abf4ff4e_wcrbiv.jpg",
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamp: true,
  }
);
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign(
      { _id: this._id.toString() },
      process.env.TOKEN_SECRET_KEY
    );

    /// add token into the database
    this.tokens = this.tokens.concat({ token: token });
    await this.save();

    return token;
  } catch (error) {
    console.log(`Error is ${error}`);
  }
};

const dataset =
  mongoose.models.allusers || mongoose.model("allusers", userSchema);
export default dataset;
