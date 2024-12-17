import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitRegistration } from "../redux/slices/authSlice";
import Auth from "../assets/auth.jpg";
import Google from "../assets/google.jpg";
import India from "../assets/indiaflag.jpg";
import USFlag from "../assets/us.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const response = useSelector((state) => state.auth);
  const countryFlags = {
    "+91": { code: "+91", flag: India },
    "+1": { code: "+1", flag: USFlag },
    "+44": { code: "+44", flag: India },
    "+61": { code: "+61", flag: USFlag },
  };

  const handleCountryChange = (code) => {
    setCountryCode(code);
    setIsDropdownOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!termsAccepted) {
      alert("You must accept the terms and conditions.");
      return;
    }

    const formData = {
      fullName,
      email,
      password,
      phoneNumber: `${countryCode}${phoneNumber}`,
      termsAccepted,
    };

    dispatch(submitRegistration(formData));
    console.log("Dispatched:", formData);
  };

  useEffect(() => {
    if (
      response.user &&
      response.user.message === "User registered successfully"
    ) {
      navigate("/login", { replace: true }); 
    }
  }, [response, navigate]);

  useEffect(() => {
    if (
      response.user &&
      response.user.message === "User registered successfully"
    ) {
      navigate("/login", { replace: true });
    }
  }, [response, navigate]);

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
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Sana Ray"
                className="w-full border-b-2 border-gray-300 py-1 focus:outline-none focus:border-blue-600 text-sm text-black"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sanaray12@gmail.com"
                className="w-full border-b-2 border-gray-300 py-1 focus:outline-none focus:border-blue-600 text-sm text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="****"
                className="w-full border-b-2 border-gray-300 py-1 focus:outline-none focus:border-blue-600 text-sm text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Phone Number
              </label>
              <div className="flex items-center border-b-2 border-gray-300 pb-1">
                <div className="relative flex items-center">
                  <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="cursor-pointer text-sm font-medium"
                  >
                    <img
                      src={countryFlags[countryCode].flag}
                      alt="Country Flag"
                      className="w-5 h-5 mr-2"
                    />
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 bg-white border shadow-lg w-[70px] z-10 mt-1">
                      {Object.entries(countryFlags).map(
                        ([code, { flag, code: countryCode }]) => (
                          <div
                            key={code}
                            className="flex items-center p-1 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleCountryChange(code)}
                          >
                            <img
                              src={flag}
                              alt={countryCode}
                              className="w-5 h-5 mr-2"
                            />
                            <span className="text-xs">{countryCode}</span>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
                <span className="border-r-2 h-4 mx-2"></span>
                <input
                  type="tel"
                  placeholder="+919999999999"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full focus:outline-none text-sm text-gray-800"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-[#4D49F6] text-white py-2 rounded-full text-sm font-semibold shadow-lg"
            >
              CREATE ACCOUNT
            </button>

            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                id="terms"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-2 text-xs text-gray-500">
                I accept the terms & Conditions
              </label>
            </div>
          </form>

          <div className="flex items-center my-6">
            <div className="h-[1px] bg-gray-300 flex-1"></div>
            <span className="px-4 bg-[#EDEDED] text-[#212121] text-md font-medium">
              Or
            </span>
            <div className="h-[1px] bg-gray-300 flex-1"></div>
          </div>

          <button className="w-full flex items-center bg-gray-50 justify-center border py-2 rounded-md text-sm">
            <img src={Google} alt="Google" className="w-4 h-4 mr-2" />
            Sign up with Google
          </button>

          <p className="text-center text-xs text-gray-600 mt-6">
            Own an Account?{" "}
            <Link to="/login" className="underline font-bold">
              JUMP RIGHT IN
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;
