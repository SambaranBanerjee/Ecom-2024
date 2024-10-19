import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/auth";
import adminProductsSlice from "./admin/products-slice/index";
import shopProductsSlice from "./shop/products-slice/index";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    shopProducts: shopProductsSlice,
  },
});

export default store;
