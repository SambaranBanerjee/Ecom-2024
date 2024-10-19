const bcrypt = require("bcryptjs");

const User = require("../models/user");

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });

    const hash = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hash,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User Registerd",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports = { registerUser };
