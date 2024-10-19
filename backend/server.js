const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/Auth/auth-router");
const adminProductsRouter = require("./routes/admin/productsRoutes");
const shopProductsRouter = require("./routes/shop/productsRoutes");

mongoose
  .connect(
    "mongodb+srv://ayanangshudutta1:y8Q7rcsctQDVK9dx@cluster0.5opve.mongodb.net/"
  )
  .then(() => console.log("Mongo DB Connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/listings", adminProductsRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
