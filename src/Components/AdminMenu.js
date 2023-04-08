import React from 'react'
import {NavLink } from 'react-router-dom';
import "../Style/admin.css"

function AdminMenu() {
  return (
    <div className="admin-fixed">
        <h3>Admin Panel</h3>
        <div className="list-group">
            <NavLink to="/dashboard/admin/create-category" className="list-group-item">Create Category</NavLink>
            <NavLink to="/dashboard/admin/create-product" className="list-group-item">Create Product</NavLink>
            <NavLink to="/dashboard/admin/products" className="list-group-item">Products</NavLink>
            <NavLink to="/dashboard/admin/orders" className="list-group-item">Users</NavLink>
        </div>
    </div>
  )
}

export default AdminMenu;