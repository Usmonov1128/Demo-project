import express, { json } from "express";
import mongoose from "mongoose";
import { create } from "express-handlebars";
import * as dotenv from "dotenv";
import flash from "connect-flash"
import session from "express-session";
import varMiddleware from "./middleware/var.js";
import cookieParser from "cookie-parser";
import userMiddleware from "./middleware/user.js";

// Routes
import AuthRouts from "./routes/auth.js";
import ProductsRouts from "./routes/products.js";
import hbHelpers from "./utills/index.js"

dotenv.config();

const app = express();

const hbs = create({
  defaultLayout: "main",
  extname: "hbs", helpers: hbHelpers});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(express.json());
app.use(cookieParser())
app.use(session({secret: "App", resave: false,  saveUninitialized: false}))
app.use(flash())
app.use(varMiddleware)
app.use(userMiddleware)


app.use(AuthRouts);
app.use(ProductsRouts);

const satartApp = () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("MongoDB connected");
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
      });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`server is running ${port} port`);
    });
  } catch (error) {
    console.log(error);
  }
};
satartApp();

