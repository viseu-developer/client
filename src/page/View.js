import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const View = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [cart, setCart] = useCart();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/product/get-product/${params.slug}`
      );
      setProduct(data?.products);
      getSimilarProduct(data?.products._id, data?.products.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();

    //eslint-disable-next-line
  }, [params?.slug]);
  return (
    <div className="home">
      <div className="container mt-5">
        {/* {JSON.stringify(product, null, 4)} */}
        <div className="row">
          <div className="col-md-4">
            <div class="card bg-black">
              <div
                class="bg-image hover-overlay ripple"
                data-mdb-ripple-color="light"
              >
                <img
                  src={`/api/product/product-photo/${product._id}`}
                  className="card-img-top"
                  alt="Fissure in Sandstone"
                />
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <h3>Name : {product?.name}</h3>
            <p>Price : ${product?.price}</p>
            <h6>Category : {product?.category?.name}</h6>
            <p>Description : {product?.description}</p>
            <button className="btn btn-primary">Addcart</button>
          </div>
        </div>

        <div className="my-4">
          <h3>Similar</h3>
          {/* {JSON.stringify(relatedProduct, null, 4)} */}
          <div class="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
            {relatedProduct?.map((item) => (
              <div className="col" key={item?._id}>
                <div className="card bg-black">
                  {/* <Link to={`/dashboard/admin/product/${item?.slug}`}> */}
                  <img
                    src={`/api/product/product-photo/${item?._id}`}
                    className="card-img-top bg-black"
                    alt="Fissure in Sandstone"
                  />
                  {/* </Link> */}
                  <div className="card-body">
                    <h5 className="card-title text-limit">{item?.name}</h5>
                    {/* <p className="card-text">{item?.description}</p> */}
                    <p>${item?.price}</p>

                    {/* <button
                          className="btn btn-primary"
                          onClick={() => navigate(`/view/${item?.slug}`)}
                        >
                          View
                        </button> */}

                    <button
                      className="btn btn-success ms-2"
                      onClick={() => {
                        setCart([...cart, item]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, item])
                        );
                        toast.success("Item added to cart");
                      }}
                    >
                      Addcart
                    </button>
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

export default View;
