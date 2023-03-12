import React,{useState} from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useSnackbar } from "notistack";

const ForgotPassword = () => {
    const [email , setEmail] = useState("");
    const [loading , setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const forgetPasswordHandler = (e) => {
        e.preventDefault();
        setLoading(true)
    }
  return (
    <>
      <div className="auth-main">
        <div className="auth-title">
          <h3>No Worries</h3>
          <p>Verify Email To Continue !</p>
        </div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="auth-form">
              <div className="auth-input">
                <label htmlFor="">Email :</label>
                <br />
                <input
                  type="text"
                  placeholder="Email Here"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="main-btn">
                {loading ? (
                  <button>
                    <CircularProgress style={{ width: '20px', height: '20px',marginTop:'2px',color:'white' }}
                    />
                  </button>
                ) : (
                  <button onClick={(e) => forgetPasswordHandler(e)}>
                    Verify Email
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
  )
}

export default ForgotPassword