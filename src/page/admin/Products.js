import React, { useEffect, useState } from "react";
import "../../Style/admin.css";
import "../../Style/product.css";

import AdminMenu from "../../Components/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [product, setProduct] = useState([]);

  //get all products

  const getAllProducts = async (e) => {
    try {
      const { data } = await axios.get("/api/product/get-product");
      setProduct(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something wrong getting products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="admin container-fluid ">
      <div className="row m-4">
        <div className="col-md-3">
          <AdminMenu />
        </div>

        <div className="col-md-9">
          <h3>All Product list</h3>
          <div className="row">
            {product?.map((item) => (
              <div className="col-md-3" key={item?._id}>
                <div className="card">
                  <Link to={`/dashboard/admin/product/${item?.slug}`}>
                  {/* <Link to={`/dashboard/admin/product/${item?._id}`}> */}

                    <img
                      src={`/api/product/product-photo/${item?._id}`}
                      // src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"
                      className="card-img-top"
                      alt="Fissure in Sandstone"
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{item?.name}</h5>
                    <p className="card-text text">{item?.description}</p>
                    <p>${item?.price}</p>
                    <button className="btn btn-outline-success">Buynow</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
