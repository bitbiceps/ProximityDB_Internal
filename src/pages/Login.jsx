import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { cookieAccessKeys } from "../utils";
import { toast } from "react-toastify";
import Auth from "../assets/auth.jpg";
import Google from "../assets/google.jpg";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate email domain
    const domain = "@saimanshetty.com";
    if (!email.endsWith(domain)) {
      toast.error(`Email address is wrong`);
      return;
    }

    // Simulate login success
    setLoading(true);
    // setTimeout(() => {
    // Store email in cookies
    Cookies.set(cookieAccessKeys?.tokens?.accessToken, email);

    toast.success("Login successful!");
    setLoading(false);

    // Navigate to dashboard
    navigate("/", {
      replace: true,
      state: { current: "Dashboard" },
    });
    // }, 1000); // Simulate a network request delay
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row w-full h-full max-w-none bg-white">
        <div className="w-full md:w-1/2 h-1/2 md:h-full">
          <img
            src={Auth}
            alt="Tablet in hand"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col w-full md:w-1/2 px-8 md:px-48 py-6 md:py-16 h-full justify-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 text-center">
            Unlock Your PR Potential
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full border-b-2 border-gray-300 py-1 focus:outline-none focus:border-blue-600 text-sm text-gray-800"
              />
            </div>

            <button
              type="submit"
              className={`mt-4 w-full bg-[#4D49F6] text-white py-2 rounded-full text-sm font-semibold shadow-lg ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Logging In..." : "LOGIN"}
            </button>
          </form>

          <button className="mt-8 w-full flex items-center bg-gray-50 justify-center border py-2 rounded-md text-sm">
            <img src={Google} alt="Google" className="w-4 h-4 mr-2" />
            Login with Google
          </button>

          <p className="text-center text-xs text-gray-600 mt-6">
            New to Account?{" "}
            <Link to="/registration" className="underline font-bold">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
