import React, { useState } from "react";
import "../../Style/register.css";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";


const Login = () => {
    const [auth, setAuth] = useAuth();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();

        try {
            const res = await axios.post("/api/auth/login",{
                email,
                password,
            })

            if(res && res.data.success) {
              navigate("/");
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data));

            }else{
                toast.error(res.data.message);
            }
            
        } catch (error) {
            alert("error");
            toast.error("Something went wrong");
        }
        

        // toast.success("Success")
    }

  return (
    <div className="login">
      <div className="container image  mt-5 ">
        {/* <Toaster /> */}
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}

            />
            <label for="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}

            />
            <label for="floatingPassword">Password</label>
          </div>

          <button type="submit" className="my-4 btn btn-primary btn-block mb-4">
            Login
          </button>
          <Link to="/forgot-password" >foget Password</Link>

          <div className="text-center">
            {/* <p>Not a member? <a href="#!">Register</a></p> */}
            <p className="text-black">or <Link to="/register">sign up</Link>  with:</p>
            <button type="button" className="btn btn-secondary btn-floating mx-1">
              <i className="fab fa-facebook-f"></i>
            </button>

            <button type="button" className="btn btn-secondary btn-floating mx-1">
              <i className="fab fa-google"></i>
            </button>

            <button type="button" className="btn btn-secondary btn-floating mx-1">
              <i className="fab fa-twitter"></i>
            </button>

            <button type="button" className="btn btn-secondary btn-floating mx-1">
              <i className="fab fa-github"></i>
            </button>
          
          </div>
        </form>
      </div>
    </div>
    
  );
};

export default Login;
