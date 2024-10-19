import { Routes, Route } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

import "./App.css";
import AuthLayout from "./components/auth/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Orders from "./pages/admin/Orders";
import Products from "./pages/admin/Products";
import Features from "./pages/admin/Features";
import ShoppingLayout from "./components/shopping/ShoppingLayout";
import NotFound from "./pages/error/NotFound";
import Account from "./pages/shopping/Account";
import Checkout from "./pages/shopping/Checkout";
import Home from "./pages/shopping/Home";
import Listing from "./pages/shopping/Listing";
import IsAuthenticated from "./components/common/IsAuthenticated";
import UnAuth from "./pages/error/UnAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice/auth";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading)
    return <Skeleton className="w-[800px] h-[20px] bg-black rounded-full" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <IsAuthenticated isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </IsAuthenticated>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/admin"
          element={
            <IsAuthenticated isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </IsAuthenticated>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="features" element={<Features />} />
        </Route>
        <Route
          path="/shop"
          element={
            <IsAuthenticated isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </IsAuthenticated>
          }
        >
          <Route path="account" element={<Account />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="home" element={<Home />} />
          <Route path="listing" element={<Listing />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth" element={<UnAuth />} />
      </Routes>
    </div>
  );
}

export default App;
