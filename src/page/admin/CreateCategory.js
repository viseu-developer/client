import React, { useEffect, useState } from "react";
import "../../Style/admin.css"

import AdminMenu from "../../Components/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../Components/form/CategoryForm";
import { Button, Modal } from "antd";

function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updated, setUpdated] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created successfully`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong in input form");
    }
  };

  // update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/category/update-category/${selected._id}`,
        { name: updated }
      );
      if (data.success) {
        toast.success(data.message);
        setSelected(null);
        setUpdated("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong update category");
    }
  };


  // delet category
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/category/delete-category/${id}`);
      if (data.success) {
        toast.success(data.message);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong delete category");
    }
  };


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

  return (
    // <>
    //   <div>
    //     CreateCategory
    // </div>
    // </>

    <div className=" admin container-fluid">
      <div className="row m-4">
        <div className="col-md-3 ">
          <AdminMenu />
        </div>

        <div className="col-md-8 my-3 content mCustomScrollbar">
          <h3>Category</h3>
          <CategoryForm
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
          />
          <table className="table table-hover text-nowrap  table-bordered">
            <thead className="text-primary">
              <tr>
                <th scope="col">name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>
                      <button
                        onClick={() => {
                          setVisible(true);
                          setUpdated(item.name);
                          setSelected(item);
                        }}
                        className="btn btn-primary ms-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>{handleDelete(item._id)}}
                        className="btn btn-danger ms-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* <table className="table table-bordered table-hover text-nowrap w-100">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                      {
                        category.map((item) =>{
                          return (
                            <tr key={item._id}>
                              <td >{item.name}</td>
                              <td>
                                <button className="btn btn-primary">Edit</button>
                              </td>
                            </tr>
                            
                          )
                        })
                      }
                    
                  </tbody>

                </table> */}
          <Modal
            onCancel={() => setVisible(false)}
            // footer={null}
            visible={visible}
          >
            <CategoryForm
              value={updated}
              setValue={setUpdated}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default CreateCategory;
