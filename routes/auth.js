import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import { generateJWTToken } from "../services/token.js";



const router = Router();

router.get("/login", (req, res) => {
  if (req.cookies.token) {
    res.redirect("/")
    return
  }
  res.render("login", {
    title: "Login",
    isLogin: true,
    loginError: req.flash("loginError"),
  });
});

router.get("/register", (req, res) => {
  if (req.cookies.token) {
    res.redirect("/")
    return
  }
  res.render("register", {
    title: "Register",
    isRegister: true,
    registerError: req.flash("registerError"),
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token")
  res.redirect("/")
  res.send("logout")
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  if (!email || password) {
    req.flash("loginError", "All fields  is required")
    res.redirect("/login")
    return
  }
  const existUser = await User.findOne({ email });

  if (!existUser) {
    req.flash("loginError", "User not found")
    res.redirect("/login")
    return
  }

  const isPassEqual = await bcrypt.compare(req.body.Password, existUser.password);

  if (!isPassEqual) {
    req.flash("loginError", "Password wrong")
    res.redirect("/login")
    return
  }



  const token = generateJWTToken(existUser._id)
  res.cookie("token", token, { httpOnly: true, secure: true })
  res.redirect("/");
});

router.post("/register", async (req, res) => {

  const { firstname, Lastname, email, Password } = req.body
  const hashedPassword = await bcrypt.hash(Password, 10);

  if (!firstname || !Lastname || !email || !Password) {
    req.flash("registerError", "All fields  is required")
    res.redirect("/register")
    return
  }
  const candidate = await User.findOne({ email })

  if (candidate) {
    req.flash("registerError", "user already exist")
    res.redirect("/register")
    return

  }
  const userData = {
    firstName: req.body.firstname,
    lastName: req.body.Lastname,
    email: req.body.email,
    password: hashedPassword,
  };
  const user = await User.create(userData);
  console.log(user);
  const token = generateJWTToken(user._id)
  res.cookie("token", token, { httpOnly: true, secure: true })
  res.redirect("/");
});

export default router;
