import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useSnackbar } from "notistack";
import PasswordStrengthBar from "react-password-strength-bar";

const RegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const initialState = {
    userName: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  };
  const [registerData, setRegisterData] = useState(initialState);
  const [checkNumber, setCheckNumber] = useState(false);
  const [checkSpecialChar, setCheckSpecialChar] = useState(false);
  const [checkLowerCase, setCheckLowerCase] = useState(false);
  const [checkUpperCase, setCheckUpperCase] = useState(false);
  const [checkPasswordLength, setCheckPasswordLength] = useState(false);
  const [seenToggler, setSeenToggler] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (/\d/.test(registerData.password)) {
      setCheckNumber(true);
    }
    if (!/\d/.test(registerData.password)) {
      setCheckNumber(false);
    }
    if (registerData.password.length > 8) {
      setCheckPasswordLength(true);
    }
    if (registerData.password.length < 8) {
      setCheckPasswordLength(false);
    }
    if (!/[a-z]/.test(registerData.password)) {
      setCheckLowerCase(false);
      console.log("Password must contain at least one lowercase letter (a-z).");
    }
    if (/[a-z]/.test(registerData.password)) {
      setCheckLowerCase(true);
      console.log("Password must contain at least one lowercase letter (a-z).");
    }

    // Check for uppercase letter
    if (!/[A-Z]/.test(registerData.password)) {
      console.log("Password must contain at least one uppercase letter (A-Z).");
      setCheckUpperCase(false);
    }
    if (/[A-Z]/.test(registerData.password)) {
      console.log("Password must contain at least one uppercase letter (A-Z).");
      setCheckUpperCase(true);
    }

    // Check for special character
    if (!/[!@#$%^&*()_+}{":;'?/>.<,]/.test(registerData.password)) {
      console.log(
        "Password must contain at least one special character (!@#$%^&*()_+}{\":;'?/>.<,)."
      );
      setCheckSpecialChar(false);
    }
    if (/[!@#$%^&*()_+}{":;'?/>.<,]/.test(registerData.password)) {
      console.log(
        "Password must contain at least one special character (!@#$%^&*()_+}{\":;'?/>.<,)."
      );
      setCheckSpecialChar(true);
    }

    // Check for whitespace
    // if (/\s/.test(registerData.password)) {
    //   console.log("Password must not contain any whitespace characters.");
    // }

    // If all checks pass, password is valid
    // if (
    //   /^[a-zA-Z0-9!@#$%^&*()_+}{":;'?/>.<,]{8,}$/.test(registerData.password)
    // ) {
    //   console.log("Password is valid.");
    // }
  }, [registerData.password]);

  const registerHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios({
      url: `${process.env.REACT_APP_BASEURL}/user/registerUser`,
      method: "POST",
      data: {
        ...registerData,
      },
    })
      .then((res) => {
        setLoading(false);
        enqueueSnackbar(res.data.message, { variant: "success" });
        navigate("/verify-otp", { state: registerData.email });
        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar(err.response.data.message, { variant: "error" });
        console.log();
      });
  };
  console.log("register : ", checkNumber);

  const seenHandler = (e) => {
    e.preventDefault();
    setSeenToggler(!seenToggler);
  };

  return (
    <div className="auth-main">
      <div className="auth-title">
        <h3>Create Account</h3>
        <p>Register To Continue !</p>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="checker checker1">
            {checkSpecialChar ? (
              <p className="span-checker1">
                {" "}
                Special Character{" "}
                <span className="span-checker ">
                  <i class="fa-solid fa-circle-check"></i>
                </span>
              </p>
            ) : (
              <p className="span-checker2">
                Special Character missing{" "}
                <span className="span-checker">
                  <i class="fa-solid fa-circle-check"></i>
                </span>
              </p>
            )}
            {checkPasswordLength ? (
              <p className="span-checker1">
                {" "}
                Password Length is good{" "}
                <span className="span-checker ">
                  <i class="fa-solid fa-circle-check"></i>
                </span>
              </p>
            ) : (
              <p className="span-checker2">
                Password length is smaller{" "}
                <span className="span-checker">
                  <i class="fa-solid fa-circle-check"></i>
                </span>
              </p>
            )}
            {checkNumber ? (
              <p className="span-checker1">
                Number
                <span className="span-checker ">
                  <i class="fa-solid fa-circle-check"></i>
                </span>
              </p>
            ) : (
              <p className="span-checker2">
                Missing Number
                <span className="span-checker ">
                  <i class="fa-solid fa-circle-check"></i>
                </span>
              </p>
            )}
          </div>
        </div>
        <div className="col-md-4">
          <div className="auth-form">
            <div className="auth-input">
              <label htmlFor="">Full Name :</label>
              <br />
              <input
                type="text"
                placeholder="Full Name Here"
                name="userName"
                value={registerData.userName}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="auth-input">
              <label htmlFor="">Phone Number :</label>
              <br />
              <input
                type="number"
                placeholder="Phone Number Here"
                name="phone"
                value={registerData.phone}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="auth-input">
              <label htmlFor="">Email :</label>
              <br />
              <input
                type="text"
                placeholder="Email Here"
                name="email"
                value={registerData.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="auth-input auth-position">
              <label htmlFor="">Password :</label>
              <br />
              {seenToggler ? (
                <>
                  <p className="eye-icon" onClick={(e) => seenHandler(e)}>
                    <i class="fa-sharp fa-solid fa-eye-slash"></i>
                  </p>
                  <input
                    type="text"
                    placeholder="Password Here"
                    name="password"
                    value={registerData.password}
                    onChange={(e) => handleChange(e)}
                  />
                </>
              ) : (
                <>
                  <p className="eye-icon" onClick={(e) => seenHandler(e)}>
                  <i class="fa-solid fa-eye"></i>
                  </p>
                  <input
                    type="password"
                    placeholder="Password Here"
                    name="password"
                    value={registerData.password}
                    onChange={(e) => handleChange(e)}
                  />
                </>
              )}

              <div className="password-strength">
                <PasswordStrengthBar password={registerData.password} />
              </div>
            </div>
            <div className="auth-input">
              <label htmlFor="">Confirm Password :</label>
              <br />
              <input
                type="password"
                placeholder="Confirm Password Here"
                name="confirm_password"
                value={registerData.password_confirmation}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="main-btn">
              {registerData.password !== registerData.confirm_password ? (
                <button disabled={true}>Register</button>
              ) : loading ? (
                <button>
                  <CircularProgress
                    style={{
                      width: "20px",
                      height: "20px",
                      marginTop: "2px",
                      color: "white",
                    }}
                  />
                </button>
              ) : (
                <button onClick={(e) => registerHandler(e)}>Register</button>
              )}
            </div>
            <div className="mt-4">
              <h4>
                ALready Have an Account ?{" "}
                <NavLink to="/" className="auth-link">
                  Log In
                </NavLink>{" "}
              </h4>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="checker checker2">
            {checkLowerCase ? (
              <p className="span-checker1">
                <span className="span-checker ">
                  <i class="fa-solid fa-circle-check"></i>
                </span>
                Lowercase Alphabet
              </p>
            ) : (
              <p className="span-checker2">
                <span className="span-checker">
                  <i class="fa-solid fa-circle-check"></i>
                </span>
                Lowercase Alphabet Missing
              </p>
            )}
            {checkUpperCase ? (
              <p className="span-checker1">
                <span className="span-checker ">
                  <i class="fa-solid fa-circle-check"></i>
                </span>
                Uppercase Alphabet
              </p>
            ) : (
              <p className="span-checker2">
                <span className="span-checker ">
                  <i class="fa-solid fa-circle-check"></i>
                </span>
                Uppercase Alphabet Missing
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
