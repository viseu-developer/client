import React from "react";
import { useSearch } from "../context/search";
import "../Style/home.css"

const Search = () => {
  const [values, setValues] = useSearch();

  return (
    <div className="home">
      <div class="container text-center mt-4">
        <h1>
          {values?.results.length < 1
            ? "No Products Found"
            : `Found ${values?.results.length}`}
        </h1>
        <div class="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
          {values.length === 0 ? (
            <div className="d-flex justify-content-center m-auto">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            values?.results.map((item) => (
              <div className="col" key={item._id}>
                <div className="card bg-black">
                  {/* <Link to={`/dashboard/admin/product/${item.slug}`}> */}
                  <img
                    src={`/api/product/product-photo/${item._id}`}
                    // src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"
                    className="card-img-top bg-black"
                    alt="Fissure in Sandstone"
                  />
                  {/* </Link> */}
                  <div className="card-body">
                    <h5 className="card-title text">{item.name}</h5>
                    {/* <p className="card-text">{item.description}</p> */}
                    <p>${item.price}</p>
                    <button className="btn btn-outline-success">Addcart</button>
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

export default Search;
