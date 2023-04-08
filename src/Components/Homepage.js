import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../Style/home.css";
// import '../Style/navbar.css'
// import { Toaster } from 'react-hot-toast';
import { useAuth } from "../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { Prices } from "./Prices";
import { useCart } from "../context/cart";

const Homepage = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      // const { data } = await axios.get("/api/product/get-product");
      const { data } = await axios.get(`/api/product/product-list/${page}`);
      setLoading(false);
      setProduct(data?.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
        // toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
    //eslint-disable-next-line
  }, [page]);
  //loadmore products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/product/product-list/${page}`);
      setLoading(false);
      setProduct([...product, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((item) => item !== id);
    }
    setChecked(all);
  };

  // get filter product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/product/product-filters", {
        checked,
        radio,
      });
      setProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();

    //eslint-disable-next-line
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();

    //eslint-disable-next-line
  }, [checked, radio]);

  return (
    <div className="home">
      <div className="container">
        {/* <div>{total}</div> */}
        {/* <h1 className="">Homepage</h1>
      <pre>{JSON.stringify(auth, null, 4) }</pre> */}

        <div className="row">
          <div className="col-md-2 d-flex flex-column">
            <h1>filter</h1>

            {categories?.map((item) => (
              // <p>{item._id}</p>
              <Checkbox
                key={item._id}
                onChange={(e) => handleFilter(e.target.checked, item._id)}
              >
                {item.name}
              </Checkbox>
            ))}

            <h1>Prices</h1>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
            {/* {JSON.stringify(radio, null, 4)} */}
            <button
              onClick={() => window.location.reload()}
              className="btn btn-danger my-2"
            >
              RESET FILTER
            </button>
          </div>

          <div className="col-md-10">
            <h1 className="text-center">all products</h1>
            <div class="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
              {product.length === 0 ? (
                <div className="d-flex justify-content-center m-auto">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                product?.map((item) => (
                  <div className="col" key={item?._id}>
                    <div className="card bg-black">
                      {/* <Link to={`/dashboard/admin/product/${item?.slug}`}> */}
                      <img
                        src={`/api/product/product-photo/${item?._id}`}
                        // src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"
                        className="card-img-top bg-black"
                        alt="Fissure in Sandstone"
                      />
                      {/* </Link> */}
                      <div className="card-body">
                        <h5 className="card-title text-limit">{item?.name}</h5>
                        {/* <p className="card-text">{item?.description}</p> */}
                        <p>${item?.price}</p>

                        <button
                          className="btn btn-primary"
                          onClick={() => navigate(`/view/${item?.slug}`)}
                        >
                          View
                        </button>

                        <button
                          className="btn btn-success ms-2"
                          onClick={() => {setCart([...cart, item]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, item]),
                            )
                            toast.success("Item added to cart")
                          }}
                        >
                          Addcart
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {product && product.length < total && (
              <button
                className="btn btn-primary my-2"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
