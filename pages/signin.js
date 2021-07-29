import Head from "next/head";
import { LockClosedIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useState } from "react";
import { postData } from "../server/routes/userAuth";
import { useSelector, useDispatch } from "react-redux";
import { showLoader } from "../store/index";
import { show } from "./register";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { setUserAuth } from "../store/index";
const signin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
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
    const { email, password } = data;
    const res = await postData("auth/signin", data);
    if (res.err) {
      dispatch(showLoader(false));
      return show("Sorry ! ", res.err, "bg-red-400");
    }
    cookie.set("userAuthEcommerce", res.user.tokens[0].token, {
      expires: 1 / 24,
    });
    dispatch(setUserAuth(res.user));
    show("Success ! ", res.user.name, "bg-green-500");

    router.push("/");
    dispatch(showLoader(false));
  };
  return (
    <div className="signin">
      <Head>
        <title>SignIn Page</title>
      </Head>
      <main>
        <div className="signinform">
          <div className="min-h-screen  flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md shadow-xl py-5 px-3 w-full space-y-8">
              <div>
                {/* <img
                  className="mx-auto h-12 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                /> */}
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Log in to your account
                </h2>
              </div>
              <form
                className="mt-8 space-y-6"
                onSubmit={handleSubmitForm}
                method="POST"
              >
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="my-2">
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      type="email"
                      autoComplete="email"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={data.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  {/* <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-gray-800 hover:text-gray-500"
                    >
                      Forgot your password?
                    </a>
                  </div> */}
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
                    Sign in
                  </button>
                  <div className="text-sm text-center my-5 cursor-pointer">
                    <Link href="/register">
                      <a className="font-large text-indigo-800 hover:text-indigo-500">
                        Don't Have Account! Create Here
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

export default signin;
