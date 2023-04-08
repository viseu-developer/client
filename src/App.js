import React from 'react'
import {BrowserRouter,Route, Routes} from "react-router-dom"
import Homepage from './Components/Homepage';
import Login from './Components/auth/Login';
import Navbar from './Components/Navbar';
import Register from './Components/auth/Register';
import { Toaster } from "react-hot-toast";

import PageError from './page/PageError'
import Dashboard from './page/user/Dashboard';
import Private from './Components/routes/Private';
import ForgetPassword from './Components/auth/ForgetPassword';
import AdminDashboard from './page/admin/AdminDashboard';
import AdminRoute from './Components/routes/AdminRoute';
import AdminMenu from './Components/AdminMenu';
import CreateCategory from './page/admin/CreateCategory';
import CreateProduct from './page/admin/CreateProduct';
import AdminOrders from './page/admin/AdminOrders';
import Profile from './page/user/Profile';
import Orders from './page/user/Orders';
import Products from './page/admin/Products';
import UpdateProduct from './page/admin/UpdateProduct';
import Search from './page/Search';
import View from './page/View';
import CategoryProduct from './page/CategoryProduct';
import Cart from './page/Cart';
const App = () => {
  return (
    <div>
        <BrowserRouter>
        <Navbar/>
        <Toaster/>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/view/:slug" element={<View/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/categoryproduct/:slug" element={<CategoryProduct/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/forgot-password" element={<ForgetPassword/>} />

          <Route path="/*" element={<PageError/>} />

          <Route path="/dashboard" element={<Private/>} >
            <Route path="user" element={<Dashboard/>} />
            <Route path="user/profile" element={<Profile/>} />
            <Route path="user/orders" element={<Orders/>} />
          </Route>

          <Route path="/dashboard" element={<AdminRoute/>} >
            <Route path="admin" element={<AdminDashboard/>} />
            <Route path="admin/create-category" element={<CreateCategory/>} />
            <Route path="admin/create-product" element={<CreateProduct/>} />
            <Route path="admin/product/:slug" element={<UpdateProduct/>} />
            <Route path="admin/products" element={<Products/>} />
            <Route path="admin/orders" element={<AdminOrders/>} />

          </Route>

          <Route path="/adminmenu" element={<AdminMenu/>} />


        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;