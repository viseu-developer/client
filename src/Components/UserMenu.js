import React from 'react'
import { NavLink } from 'react-router-dom';

function UserMenu() {
  return (
    <>
        <div className="container ">
            <h3>Dashboard</h3>
            <div className="list-group">
                <NavLink to="/dashboard/user/profile" className="list-group-item">Profile</NavLink>
                <NavLink to="/dashboard/user/orders" className="list-group-item">Orders</NavLink>
            </div>
        </div>
    </>
  )
}

export default UserMenu;