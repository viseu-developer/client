import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search";

const Search = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      // console(data);
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>

      <form  class="d-flex m-auto w-50" role="search" onSubmit={handleSubmit}>
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({...values, keyword: e.target.value})}
        />
        <button type="submit" class="btn btn-primary">
          <i class="fas fa-search"></i>
        </button>
      </form>
   
    </>
  );
};

export default Search;
