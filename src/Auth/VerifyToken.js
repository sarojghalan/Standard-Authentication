import React,{useState} from "react";
import { NavLink, useLocation,useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useSnackbar } from "notistack";

const VerifyToken = () => {
  const [loading , setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location?.state;
  const [token , setToken] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const verifyHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios({
      method:"POST",
      url:`${process.env.REACT_APP_BASEURL}/user/verify-token`,
      data:{
        otp:token,
        email:email
      }
    }).then(res => {
      setLoading(false);
      enqueueSnackbar(res.data.message , {variant:"success"})
      navigate('/')
    }).catch(err => {
      setLoading(false);
      enqueueSnackbar(err.response.data.message , {variant:"error"})
    })
  };

  return (
    <>
      <div className="auth-main">
        <div className="auth-title">
          <h3>Token Token</h3>
          <p>Enter Your Token To Continue !</p>
        </div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="auth-form">
              <div className="auth-input">
                <label htmlFor="">Token :</label>
                <br />
                <input
                  type="text"
                  placeholder="Token Here"
                  name="token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                />
              </div>
              <div className="main-btn">
                {loading ? (
                  <button >
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
                <button onClick={(e) => verifyHandler(e)}>Verify Token</button>
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
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
};

export default VerifyToken;
