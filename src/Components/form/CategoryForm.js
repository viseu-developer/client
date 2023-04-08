import React from "react";

const CategoryForm = ({handleSubmit, value, setValue}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="a" class="form-label">Add Category</label>
          <input
            type="text"
            class="form-control"
            id="a"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
