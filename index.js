import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
import morgan from "morgan";
import dbconnect from "./Config/dbConnect.js";
import authRouter from "./Routes/authRoute.js";

const app = express();

//dotenv
dotenv.config();

//bodyparser Setup
app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }));

//cors-setup
app.use(cors());

//For refreshing the token
// app.use(cookieParser());

//Using Morgan
app.use(morgan("dev"));

const PORT = process.env.PORT;

dbconnect();

app.use("/user", authRouter);

app.listen(PORT, () => {
  console.log(`Server is Running at PORT : ${PORT}`);
});
