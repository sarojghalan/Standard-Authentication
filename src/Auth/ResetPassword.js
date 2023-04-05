import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import PasswordStrengthBar from "react-password-strength-bar";
import CircularProgress from "@mui/material/CircularProgress";

const ResetPassword = ({refetch,setRefetch}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [checkNumber, setCheckNumber] = useState(false);
  const [checkSpecialChar, setCheckSpecialChar] = useState(false);
  const [checkLowerCase, setCheckLowerCase] = useState(false);
  const [checkUpperCase, setCheckUpperCase] = useState(false);
  const [checkPasswordLength, setCheckPasswordLength] = useState(false);
  const [seenToggler, setSeenToggler] = useState(false);

  const initialState = {
    email: location?.state?.email,
    otp: location?.state?.otp,
    password: "",
    confirm_password: "",
  };
  const [resetData, setResetData] = useState(initialState);
  useEffect(() => {
    if (/\d/.test(resetData.password)) {
      setCheckNumber(true);
    }
    if (!/\d/.test(resetData.password)) {
      setCheckNumber(false);
    }
    if (resetData.password.length > 8) {
      setCheckPasswordLength(true);
    }
    if (resetData.password.length < 8) {
      setCheckPasswordLength(false);
    }
    if (!/[a-z]/.test(resetData.password)) {
      setCheckLowerCase(false);
    }
    if (/[a-z]/.test(resetData.password)) {
      setCheckLowerCase(true);
    }

    // Check for uppercase letter
    if (!/[A-Z]/.test(resetData.password)) {
      setCheckUpperCase(false);
    }
    if (/[A-Z]/.test(resetData.password)) {
      setCheckUpperCase(true);
    }

    // Check for special character
    if (!/[!@#$%^&*()_+}{":;'?/>.<,]/.test(resetData.password)) {
      setCheckSpecialChar(false);
    }
    if (/[!@#$%^&*()_+}{":;'?/>.<,]/.test(resetData.password)) {
      setCheckSpecialChar(true);
    }

    // Check for whitespace
    // if (/\s/.test(resetData.password)) {
    //   console.log("Password must not contain any whitespace characters.");
    // }

    // If all checks pass, password is valid
    // if (
    //   /^[a-zA-Z0-9!@#$%^&*()_+}{":;'?/>.<,]{8,}$/.test(resetData.password)
    // ) {
    //   console.log("Password is valid.");
    // }
  }, [resetData.password]);

  const handleChange = (e) => {
    e.preventDefault();
    setResetData({ ...resetData, [e.target.name]: e.target.value });
  };
  const seenHandler = (e) => {
    e.preventDefault();
    setSeenToggler(!seenToggler);
  };

  const resetHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    if (resetData.password === "" || resetData.confirm_password === "") {
      enqueueSnackbar("Empty Field Detected !", { variant: "error" });
      setLoading(false);
    }else {
      axios({
        url: `${process.env.REACT_APP_BASEURL}/user/resetPassword`,
        method: "POST",
        data: {
          ...resetData,
        },
      })
        .then((res) => {
          enqueueSnackbar(res.data.message, { variant: "success" });
          navigate("/");
          setLoading(false);
          setRefetch(!refetch)
        })
        .catch((err) => {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
          setLoading(false);
        });
    }
  };
  return (
    <>
      <div className="auth-main">
        <div className="auth-title">
          <h3>Finally</h3>
          <p>Reset Password To Continue !</p>
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
          </div>{" "}
          <div className="col-md-4">
            <div className="auth-form">
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
                      value={resetData.password}
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
                      value={resetData.password}
                      onChange={(e) => handleChange(e)}
                    />
                  </>
                )}

                <div className="password-strength">
                  <PasswordStrengthBar password={resetData.password} />
                </div>
              </div>
              <div className="auth-input">
                <label htmlFor="">Confirm Password :</label>
                <br />
                <input
                  type="password"
                  placeholder="Password Here"
                  name="confirm_password"
                  value={resetData.confirm_password}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="main-btn">
                {loading ? (
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
                  <button onClick={(e) => resetHandler(e)}>
                    Reset Password
                  </button>
                )}
              </div>
              <div className="mt-4">
                <h4>
                  Don't Have an Account ?{" "}
                  <NavLink to="/register-user" className="auth-link">
                    Sign Up
                  </NavLink>{" "}
                </h4>
                <h4>
                  <NavLink className="auth-link" to="/">
                    Log In
                  </NavLink>
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
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
