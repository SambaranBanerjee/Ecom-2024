const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUser = await User.findOne({ email });
    if (!isUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

    const isPasswordMatch = await bcrypt.compare(password, isUser.password);
    if (!isPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: isUser._id,
        role: isUser.role,
        email: isUser.email,
        userName: isUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: isUser.email,
        role: isUser.role,
        id: isUser._id,
        userName: isUser.userName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports = { loginUser };
