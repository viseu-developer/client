import React from "react";
import UserMenu from "../../Components/UserMenu";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Profile() {
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put("/api/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });

      if (data?.error) {
        toast.error(data?.error);
        // toast.success("User register successfully");
        // navigate("/login");
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() =>{
    const {email, name, phone, address} = auth.user;
    setEmail(email);
    setName(name);
    setPhone(phone);
    setAddress(address);
  },[auth.user])

  return (
    <>
      <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>

        <div className="col-md-5 m-auto">
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
                // required
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

            

            <button
              type="submit"
              className="my-4 btn btn-primary btn-block mb-4"
            >
              Update
            </button>

            <div className="text-center">
              {/* <p>Not a member? <a href ="#!">Register</a></p> */}
              <p className="text-black">or sign up with:</p>
              <button
                type="button"
                className="btn btn-secondary btn-floating mx-1"
              >
                <i className="fab fa-facebook-f"></i>
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-floating mx-1"
              >
                <i className="fab fa-google"></i>
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-floating mx-1"
              >
                <i className="fab fa-twitter"></i>
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-floating mx-1"
              >
                <i className="fab fa-github"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </>
  );
}

export default Profile;
