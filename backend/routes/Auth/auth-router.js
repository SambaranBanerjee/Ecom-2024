const express = require("express");
const { registerUser } = require("../../controllers/register");
const { loginUser } = require("../../controllers/login");
const { logoutUser } = require("../../controllers/logout");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/authCheck", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated User",
    user,
  });
});

module.exports = router;
