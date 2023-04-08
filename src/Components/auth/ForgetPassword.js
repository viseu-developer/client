import React, { useState } from 'react'
import "../../Style/register.css";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ForgetPassword = () => {
    const [email,setEmail] = useState("");
    const [answer,setAnswer] = useState("");
    const [newPassword,setNewpassword] = useState("");
    
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();

        try {
            const res = await axios.post("/api/auth/forgot-password",{
                email,
                newPassword,
                answer
            })

            if(res && res.data.success) {
              navigate("/login");
                toast.success(res.data && res.data.message);
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
    <div className="forget">
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
                <div className="form-floating mb-3">
                <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewpassword(e.target.value)}

                />
                <label for="floatingPassword">New Password</label>
                </div>

                <div class="form-floating mb-3">
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
                Reset
                </button>

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
  )
}

export default ForgetPassword;