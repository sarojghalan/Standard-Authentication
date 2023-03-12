import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useSnackbar } from "notistack";

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

  const handleChange = (e) => {
    e.preventDefault();
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };
  const registerHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios({
      url:`${process.env.REACT_APP_BASEURL}/user/registerUser`,
      method:"POST", 
      data:{
        ...registerData
      }
    }).then((res)=>{
      setLoading(false);
      enqueueSnackbar(res.data.message , {variant:"success"})
      navigate('/verify-otp',{state:registerData.email});
      console.log(res.data);
    }).catch((err)=>{
      setLoading(false);
      enqueueSnackbar(err.response.data.message , {variant:"error"})
      console.log()
    })
  };
  return (
    <div className="auth-main">
      <div className="auth-title">
        <h3>Create Account</h3>
        <p>Register To Continue !</p>
      </div>
      <div className="row">
        <div className="col-md-4"></div>
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
            <div className="auth-input">
              <label htmlFor="">Password :</label>
              <br />
              <input
                type="password"
                placeholder="Password Here"
                name="password"
                value={registerData.password}
                onChange={(e) => handleChange(e)}
              />
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
                <button onClick={(e) => registerHandler(e)}>Register</button>
              )}
            </div>
            <div className="mt-4">
              <h4>
                ALready Have an Account ?{" "}
                <NavLink to="/login" className="auth-link">
                  Log In
                </NavLink>{" "}
              </h4>
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default RegisterUser;
