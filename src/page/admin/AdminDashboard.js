import React from 'react'
import "../../Style/admin.css"
import AdminMenu from '../../Components/AdminMenu';
import { useAuth } from '../../context/auth';


const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();

  return (
    
    <div className="admin container-fluid ">
      <div className="row m-4 w-100 ">
        <div className="col-md-3 ">
          <AdminMenu />
        </div>

        <div className="col-md-9 ">
          <p>Admin nmae: {auth?.user?.name}</p>
          <p>Admin email: {auth?.user?.email}</p>
          <p>Admin phone: {auth?.user?.phone}</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;