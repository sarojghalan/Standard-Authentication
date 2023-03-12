import React, { useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { useSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const initialState = {
    email: location?.state?.email,
    token: location?.state?.token,
    password: "",
    password_confirmation: "",
  };
  const [resetData, setResetData] = useState(initialState);

  const handleChange = (e) => {
    e.preventDefault();
    setResetData({...resetData,[e.target.name]:e.target.value})
  };

  const resetHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    if (resetData.password === "" || resetData.password_confirmation === "") {
      enqueueSnackbar("Empty Field Detected !", { variant: "error" });
      setLoading(false);
    } else if (resetData.password !== resetData.password_confirmation) {
      enqueueSnackbar("Confirm Password and Password Didn't Match !", {
        variant: "error",
      });
      setLoading(false);
    } else {
     
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
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="auth-form">
              <div className="auth-input">
                <label htmlFor="">Password :</label>
                <br />
                <input
                  type="text"
                  placeholder="Email Here"
                  name="password"
                  value={resetData.password}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="auth-input">
                <label htmlFor="">Confirm Password :</label>
                <br />
                <input
                  type="password"
                  placeholder="Password Here"
                  name="password_confirmation"
                  value={resetData.password_confirmation}
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
                  <NavLink to="/register" className="auth-link">
                    Sign Up
                  </NavLink>{" "}
                </h4>
                <h4>
                  <NavLink className="auth-link" to="/login">
                    Log In
                  </NavLink>
                </h4>
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
