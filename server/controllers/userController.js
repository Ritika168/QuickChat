import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Signup
export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    if (!fullName || !email || !password || !bio) {
      return res.json({ success: false, message: "Missing details" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
    });

    const token = generateToken(newUser._id);

    // ✅ Set token cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.json({
      success: true,
      userData: newUser,
      message: "Account created successfully",
    });

  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await User.findOne({ email });
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, userData.password);
    if (!isValidPassword) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(userData._id);

    // ✅ Set token cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      userData,
      message: "Logged in successfully",
    });

  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// Logout (optional)
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });

  res.json({
    success: true,
    message: "Logged out successfully",
  });
};

// Validate Auth
export const checkAuth = async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { profilePic, bio, fullName } = req.body;
    const userId = req.user._id;

    let updatedUser;

    if (!profilePic) {
      updatedUser = await User.findByIdAndUpdate(userId, { bio, fullName }, { new: true });
    } else {
      const upload = await cloudinary.uploader.upload(profilePic);
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: upload.secure_url, bio, fullName },
        { new: true }
      );
    }

    return res.json({
      success: true,
      user: updatedUser,
    });

  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
