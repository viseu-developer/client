import React, { useState, useEffect } from "react";
import "../../Style/admin.css"

import AdminMenu from "../../Components/AdminMenu";
import axios from "axios";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

function CreateProduct() {
  // const { Option } = Select
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

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
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.post("/api/product/create-product",
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
      toast.error("Something wrong create product ");
    }
  };

  return (
    <div className="admin container-fluid ">
      <div className="row m-4">
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
              {photo && (
                <div>
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Upload_Photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
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
                onChange={(value) => {
                  setShipping(value);
                }}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>

            <button type="submit" onClick={handleCreate} className="btn btn-primary">
              Create Product
            </button>
          {/* </form> */}
        </div>
        {/* <button className="btn btn-outline-primary">hhh</button> */}
      </div>
    </div>
  );
}

export default CreateProduct;
