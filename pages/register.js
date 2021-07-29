import Head from "next/head";
import { LockClosedIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { toast } from "tailwind-toast";
import { useState } from "react";
import registerformvalidation from "../server/validation/registrationformvalidation";
import { postData } from "../server/routes/userAuth";
import { useSelector, useDispatch } from "react-redux";
import { showLoader } from "../store/index";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { setUserAuth } from "../store/index";
const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    dispatch(showLoader(true));
    const { name, email, password, cpassword } = data;
    const errmessage = registerformvalidation(name, email, password, cpassword);
    if (errmessage) {
      dispatch(showLoader(false));
      show(errmessage.title, errmessage.message, errmessage.background);
    }
    const res = await postData("auth/register", data);
    if (res.err) {
      dispatch(showLoader(false));
      return show("Sorry ! ", res.err, "bg-red-400");
    }
    cookie.set("userAuthEcommerce", res.token, { expires: 1 / 24 });
    dispatch(setUserAuth(res.user));
    show("Success ! ", res.msg, "bg-green-500");
    dispatch(showLoader(false));
    router.push("/");
  };
  return (
    <div className="signin">
      <Head>
        <title>Registration Page</title>
      </Head>
      <main>
        <div className="registrationform">
          <div className="min-h-screen  flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md shadow-xl py-5 px-3 w-full space-y-8">
              <div>
                {/* <img
                  className="mx-auto h-12 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                /> */}
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Create Account
                </h2>
              </div>
              <form
                className="mt-8 space-y-6"
                onSubmit={handleSubmitForm}
                method="POST"
              >
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm">
                  <div className="my-2">
                    <label htmlFor="name" className="sr-only">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Name"
                      value={data.name}
                      onChange={handleChange}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                  </div>
                  <div className="my-2">
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="text"
                      autoComplete="email"
                      placeholder="Email Address"
                      value={data.email}
                      onChange={handleChange}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                  </div>
                  <div className="my-2">
                    <label htmlFor="cpassword" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Password"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      value={data.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="my-2">
                    <label htmlFor="password" className="sr-only">
                      Confirm Password
                    </label>
                    <input
                      id="cpassword"
                      name="cpassword"
                      type="password"
                      placeholder="Confirm Password"
                      value={data.cpassword}
                      onChange={handleChange}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LockClosedIcon
                        className="h-5 w-5 text-gray-500 group-hover:text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                    Register
                  </button>
                  <div className="text-sm text-center my-5 cursor-pointer">
                    <Link href="/signin">
                      <a className="font-large text-indigo-800 hover:text-indigo-500">
                        Already have an account?
                      </a>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Register;

export function show(title, message, background) {
  toast()
    .warning(title, message)
    .with({
      duration: 4000,
      speed: 1000,
      positionX: "end",
      positionY: "bottom",
      color: background,
      fontColor: "black",
      fontTone: 200,
    })
    .show();
}
