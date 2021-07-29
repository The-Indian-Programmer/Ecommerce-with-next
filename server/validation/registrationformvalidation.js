const registerformvalidation = (name, email, password, cpassword) => {
  if (!name || !email || !password || !cpassword) {
    return {
      title: "OOps",
      message: "Please fill all fields!",
      background: "bg-red-400",
    };
  }
  if (password !== cpassword) {
    return {
      title: "Sorry",
      message: "Password don't match",
      background: "bg-yellow-400",
    };
  }
  if (!validateEmail(email)) {
    return {
      title: "Sorry",
      message: "Email is not valid!",
      background: "bg-blue-400",
    };
  }
  if (password.length < 1) {
    return {
      title: "Sorry",
      message: "Password Must be at least 6 characters",
      background: "bg-yellow-400",
    };
  }
};

export default registerformvalidation;

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
