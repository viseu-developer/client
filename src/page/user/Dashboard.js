import React from "react";
import UserMenu from "../../Components/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
            <p>{auth?.user?.name}</p>
            <p>{auth?.user?.email}</p>
            <p>{auth?.user?.phone}</p>
            <p>{auth?.user?.address}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
