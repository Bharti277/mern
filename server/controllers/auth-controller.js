const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).json("Hello, World! by deependra bharti");
  } catch (error) {
    console.log(error);
  }
};

// Register page handler
const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(400)
        .json({ msg: "User already exists with this email" });
    }

    const saltRound = 10;
    const hash_password = await bcrypt.hash(password, saltRound);
    const userCreated = await User.create({
      username,
      email,
      phone,
      password: hash_password,
    });

    res.status(201).json({
      msg: "User registered successfully",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    // console.log(error);
    // res.status(500).json({ msg: "Internal Server Error" });
    next(error);
  }
};

// Login page handler

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    console.log(userExist, "User Exist");

    if (!userExist) {
      res.status(400).json({ msg: "User does not exist with this email" });
    }

    const user = await bcrypt.compare(password, userExist.password);

    if (user) {
      res.status(200).json({
        msg: "Login success!",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ msg: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { home, register, login };
