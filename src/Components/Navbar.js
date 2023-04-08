import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../Style/navbar.css";
import toast from "react-hot-toast";

import { useAuth } from "../context/auth";
import Search from "./form/Search";
import useCategory from "../hooks/useCategory";
import { useCart } from "../context/cart";

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <div className="heander">
      {/* <!-- Navbar --> */}
      <nav className="navbar navbar-expand-md p-3  navbar-light ">
        {/* <!-- Container wrapper --> */}
        <div className="container-fluid  ">
          {/* <!-- Toggle button --> */}
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* <!-- Collapsible wrapper --> */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <!-- Navbar brand --> */}
            <a className="navbar-brand mt-2 mt-lg-0" href="#">
              <img
                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                height="15"
                alt="MDB Logo"
                loading="lazy"
              />
            </a>
            {/* <!-- Left links --> */}
            <ul className="navbar-nav  me-auto mb-2 mb-lg-0">
              <li className="nav-link">
                <NavLink className="link" to="/">
                  Home
                </NavLink>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link link dropdown-toggle"
                  href="# "
                  id="navbarDropdown"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </a>
                {/* <!-- Dropdown menu --> */}
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  {categories?.map((item) => (
                    <li>
                      <Link class="dropdown-item" to={`/categoryproduct/${item.slug}`}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-link">
                <NavLink className="link" to="/jj">
                  Abouts
                </NavLink>
              </li>
              <li className="nav-link">
                <NavLink className="link" to="/jjh">
                  Contacts
                </NavLink>
              </li>
            </ul>
            <Search />

            {/* <!-- Left links --> */}
          </div>
          {/* <!-- Collapsible wrapper --> */}

          {/* <!-- Right elements --> */}
          <div className="d-flex align-items-center ">
            {!auth.user ? (
              <>
                <ul className="navbar-nav  ms-4">
                  <li className="nav-link">
                    <NavLink className="link" to="/login">
                      Login
                    </NavLink>
                  </li>

                  <li className="nav-link">
                    <NavLink className="link" to="/register">
                      register
                    </NavLink>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <div className="dropdown m-2">
                  <a
                    className="dropdown-toggle d-flex align-items-center hidden-arrow link"
                    href=" "
                    id="navbarDropdownMenuAvatar"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {/* <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    className="rounded-circle"
                    height="25"
                    alt="Black and White Portrait of a Man"
                    loading="lazy"
                  /> */}
                    {auth?.user?.name}&ensp;
                    <span>
                      <i class="fa-solid fa-angle-down"></i>
                    </span>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end "
                    aria-labelledby="navbarDropdownMenuAvatar"
                  >
                    <li className="nav-link">
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="me-3 dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                    </li>

                    <li className="nav-link">
                      <NavLink
                        onClick={handleLogout}
                        className="me-3 dropdown-item"
                        to="/login"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </>
            )}
            {/* <!-- Icon --> */}
            <NavLink className="text-reset me-3" to="/cart">
              <i className="fas fa-shopping-cart"></i>
              <span className="badge rounded-pill badge-notification bg-danger">
                {cart?.length}
              </span>
            </NavLink>
            &emsp;
          </div>
          {/* <!-- Right elements --> */}
        </div>
        {/* <!-- Container wrapper --> */}
      </nav>
      {/* <!-- Navbar --> */}
    </div>
  );
};

export default Navbar;
