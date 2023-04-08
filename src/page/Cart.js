import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import "../Style/cart.css";
import toast from "react-hot-toast";
import { Button, Modal } from "antd";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const [deleteId, setDeleteId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  //total price
  const totalPrice = (price) => {
    try {
      let total = 0;
      cart?.map((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === deleteId);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage?.setItem("cart", JSON.stringify(myCart));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // delete item cart
  const removeCartItem = (id) => {
    try {
      setIsModalOpen(true);
      setDeleteId(id);
      // let myCart = [...cart];
      // let index = myCart.findIndex((item) => item._id === id);
      // myCart.splice(index, 1);
      // setCart(myCart);
      // localStorage?.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // get payment
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);


  // payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal
        title="Basic Modal"
        onClick={showModal}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
      <div className="container mt-4 m-auto text-center figure">
        <div className="row">
          <div className="col-md-12">
            <h3>{`Hello ${auth?.token && auth?.user?.name}`}</h3>
            <p>
              {cart?.length > 0
                ? `You have ${cart?.length} item in your cart ${
                    auth?.token ? "" : "please login checkout"
                  }`
                : "your cart is Empty"}
            </p>

            <div className="main-table container w-100 table-responsive my-4">
              <div className="row">
                <div className="col-md-8">
                  <table className="table  align-middle mb-0 w-100   ">
                    <thead className="bg-light text-center">
                      <tr>
                        <th>REMOVE</th>
                        <th>IMAGE</th>
                        <th>TITLE</th>
                        {/* <th>SIZE</th> */}
                        <th>PRICE</th>
                        <th>QUENTITY</th>
                        {/* <th>AMOUNT</th> */}
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {cart?.map((item) => (
                        <tr>
                          <td>
                            <span onClick={() => removeCartItem(item._id)}>
                              <i className="text-danger fa-solid fa-trash "></i>
                            </span>
                          </td>

                          <td>
                            <div className=" align-items-center">
                              <img
                                height="80px"
                                width="100px"
                                src={`/api/product/product-photo/${item?._id}`}
                                classNameName=" bg-black rounded"
                                alt="Fissure in Sandstone"
                              />
                            </div>
                          </td>
                          <td>
                            <p className="fw-normal mb-1">{item?.name}</p>
                          </td>
                          {/* <td>
                          <p className="fw-normal mb-1">L</p>
                        </td> */}
                          <td>
                            <p className="fw-normal mb-1">${item?.price}</p>
                          </td>
                          <td>
                            <div className="q m-auto align-items-center">
                              <p className="fw-normal mb-1">{item?.quantity}</p>
                            </div>
                          </td>

                          {/* <td>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm btn-rounded"
                          >
                            Payment
                          </button>
                        </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="col-md-4">
                  <h2>Cart Summary</h2>
                  <p>Total | Checkout | Payment</p>

                  <h4>Total : {totalPrice()}</h4>
                  {/* <button
                    onClick={() => {
                      if (auth?.token && auth?.user?.name) {
                        alert(1);
                      } else {
                        navigate("/login");
                      }
                    }}
                    type="button"
                    className="btn btn-primary btn-sm btn-rounded"
                  >
                    Payment
                  </button> */}

                  {auth?.user?.address ? (
                    <>
                      <h4>Current Address</h4>
                      <h5>{auth?.user?.address}</h5>
                      <button
                        onClick={() => navigate("/dashboard/user/profile")}
                        className="btn btn-warning"
                      >
                        Update Address
                      </button>
                    </>
                  ) : (
                    <>
                      {auth?.token ? (
                        <button
                          onClick={() => navigate("/dashboard/user/profile")}
                          className="btn btn-warning"
                        >
                          Update Address
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => navigate("/login")}
                            className="btn btn-outline-warning"
                          >
                            Please login to checkout
                          </button>
                        </>
                      )}
                    </>
                  )}
                  {/* <DropIn
                    options={{ 
                      authorization: clientToken,
                      paypal:{
                        flow: "vault",
                      }
                     }}
                    onInstance={(instance) => setInstanse(instance)}
                  />
                  <button onClick={handlePayment} className="btn btn-primary my-3">Payment</button> */}
                  <div className="mt-2">
                    {!clientToken || !auth?.token || !cart?.length ? (
                      ""
                    ) : (
                      <>
                        <DropIn
                          options={{
                            authorization: clientToken,
                            paypal: {
                              flow: "vault",
                            },
                          }}
                          onInstance={(instance) => setInstance(instance)}
                        />

                        <button
                          className="btn btn-primary"
                          onClick={handlePayment}
                          disabled={
                            loading || !instance || !auth?.user?.address
                          }
                        >
                          {loading ? "Processing ...." : "Payment"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
