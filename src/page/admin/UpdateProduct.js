import React, { useState, useEffect } from "react";
import "../../Style/admin.css"

import AdminMenu from "../../Components/AdminMenu";
import axios from "axios";

import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const  UpdateProduct =() => {
  // const { Option } = Select
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");


  // get single product
  const getSingleProduct = async() =>{
    try {
        const {data} = await axios.get(`/api/product/get-product/${params.slug}`);
        setName(data.products.name);
        setDescription(data.products.description);
        setPrice(data.products.price);
        setQuantity(data.products.quantity);
        setShipping(data.products.shipping);
        setCategory(data.products.category._id);
        setId(data.products._id);
        
    } catch (error) {
        console.log(error);
        toast.error("Something wrong getting single product");
    }
  };
  useEffect(() =>{
    getSingleProduct();
    // eslint-disable-next-line
  }, [])


  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong in getting category");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);


  //
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.patch(`/api/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success(data?.message);
        navigate('/dashboard/admin/products')
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong update product ");
    }
  };


  //delete product

  const handleDelete = async (req, res) => {
    try {
      let answer = window.prompt('Are you sure you want to delete product ?');
      if(!answer) return;

      const {data} = await axios.delete(`/api/product/delete-product/${id}`)
      toast.success(data.message);
      navigate('/dashboard/admin/products');
      
    } catch (error) {
      console.log(error);
      toast.error("Something wrong delete product")
      
    }
  }

  return (
    <div className="admin container-fluid">
      <div className="row m-4 rowmain">
        <div className="col-md-3 ">
          <AdminMenu />
        </div>

        <div className="col-md-9">
          <h2>CreateProduct</h2>
          {/* <form className="col-md-7"> */}
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
              value={category}
            >
              {categories?.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>

            <div className="mb-3">
              <label className="btn btn-outline-primary ">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>

            <div className="mb-3">
              {photo ? (
                <div>
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_Photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              ): (
                <div>
                  <img
                    src={`/api/product/product-photo/${id}`}
                    // src={URL.createObjectURL(photo)}
                    alt="Upload_Photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )
              }
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="write name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="3"
                placeholder="write description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="write price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="write a quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <Select
                bordered={false}
                placeholder="Select a Shipping"
                size="large"
                showSearch
                className="form-select mb-3"
                value={shipping ? "yes": "No"}
                onChange={(value) => {
                  setShipping(value);
                }}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>

            <button type="submit" onClick={handleUpdate} className="btn btn-primary my-4">
              Update Product
            </button>

            <button type="submit" onClick={handleDelete} className="btn btn-danger ms-3 my-4">
              Delete Product
            </button>
          {/* </form> */}
        </div>
        {/* <button className="btn btn-outline-primary">hhh</button> */}
      </div>
    </div>
  );
}


export default UpdateProduct;