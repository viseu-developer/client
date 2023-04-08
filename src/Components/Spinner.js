import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({path = "login"}) => {

  const [count, setCount] = useState(5)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() =>{
    const interval = setInterval(() =>{
      setCount((prevValue) => --prevValue);

    }, 100);
    count === 0 && navigate(`/${path}`,{
      state: location.pathname
    });
    return () => clearInterval(interval);
  },[count, navigate, location, path])
  

  return (
    <div>
      <div className="d-flex justify-content-center">
        <h1>{count} second</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
