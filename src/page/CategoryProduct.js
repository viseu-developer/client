import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CategoryProduct = () => {
    const navigate = useNavigate()
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (params?.slug) getCategoryProduct();

    //eslint-disable-next-line
  }, [params?.slug]);

  const getCategoryProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/product/product-category/${params.slug}`
      );
      setProduct(data?.products);
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home">
      <div className="container mt-4 m-auto text-center">
        <h3>{categories?.name}</h3>
        <p>{product?.length}Products</p>

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

                    <button className="btn btn-success ms-2">Addcart</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
