// backend/app.js
import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/dbConfig.js";
import userRouter from "./routes/userRoute.js";
import accountRouter from "./routes/accountRoute.js";
import pinRouter from "./routes/pinRoute.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
dotenv.config();
dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Testing endpoint
app.get("/", (req, res) => {
  res.send(`Backend : app.js : Testing`);
});

// Route setup
app.use("/user", userRouter);
app.use("/account", accountRouter);
app.use("/pin", pinRouter);

// Error handling middleware
app.use(errorHandler);

const port = process.env.PORT || 1234;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
