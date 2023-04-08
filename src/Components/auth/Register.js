import React, { useState } from "react";
import "../../Style/register.css";
import toast from 'react-hot-toast';

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
        
      });

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        // toast.success("User register successfully");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="register">
      <div className="container image  mt-5 ">
        {/* <ToastContainer /> */}
        <form onSubmit={handleSubmit}>

        <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label for="name">Username</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label for="email">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="pass"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label for="pass">Password</label>
          </div>

          

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <label for="phone">Phone</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <label for="address">address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="answer"
              placeholder="favorite"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
            <label for="answer">What is your favorite sports</label>
          </div>

          <button type="submit" className="my-4 btn btn-primary btn-block mb-4">
            Sign in
          </button>

          <div className="text-center">
            {/* <p>Not a member? <a href ="#!">Register</a></p> */}
            <p className="text-black">or sign up with:</p>
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

export default Register;
