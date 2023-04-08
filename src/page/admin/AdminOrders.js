import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../../Style/admin.css"
import AdminMenu from '../../Components/AdminMenu';
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;


function AdminOrders() {

  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };


  return (

    <div className="admin container-fluid ">
        <div className="row m-4">
            <div className="col-md-3 ">
            <AdminMenu/>
            </div>

            <div className="col-md-9">
            <h3>Orders</h3>
            <div className="border main-table  table-responsive my-4">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Buyer</th>
                    <th scope="col"> date</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((o, i) => (
                    <>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                      <tr class="text-center">
                        <td colspan="6">
                        <div className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
                        {o?.products?.map((item) => (
                          <div className="col" key={item?._id}>
                            <div className="card bg-black">
                              <img
                                src={`/api/product/product-photo/${item?._id}`}
                                // src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"
                                className="card-img-top bg-black"
                                alt="Fissure in Sandstone"
                              />
                              <div className="card-body">
                                <h5 className="card-title text-limit">
                                  {item?.name}
                                </h5>
                                <p>${item?.price}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                        </td>
                      </tr>
                      
                    </>
                  ))}
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
    
  )
}

export default AdminOrders;