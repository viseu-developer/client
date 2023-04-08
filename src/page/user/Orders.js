import React, { useEffect, useState } from "react";
import UserMenu from "../../Components/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
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
                        <td>{o?.status}</td>
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
                              {/* <Link to={`/dashboard/admin/product/${item?.slug}`}> */}
                              <img
                                src={`/api/product/product-photo/${item?._id}`}
                                // src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"
                                className="card-img-top bg-black"
                                alt="Fissure in Sandstone"
                              />
                              {/* </Link> */}
                              <div className="card-body">
                                <h5 className="card-title text-limit">
                                  {item?.name}
                                </h5>
                                {/* <p className="card-text">{item?.description}</p> */}
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
    </>
  );
}

export default Orders;
