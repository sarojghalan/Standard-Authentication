import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import CircularProgress from "@mui/material/CircularProgress";

const RegisterUser = () => {
  const [loading , setLoading ] = useState(false);
  const initialState = {
    userName:'',
    email:"",
    phone:'',
    password:'',
    confirm_password:''
  };
  const [registerData,setRegisterData] = useState(initialState);

  const handleChange = (e) =>{
    e.preventDefault();

  }
  const registerHandler = (e) => {
    e.preventDefault();
  }
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
                name="name"
                value={registerData.name}
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
                name="password_confirmation"
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
  )
}

export default RegisterUser