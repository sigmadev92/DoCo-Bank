// backend/app.js
import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/dbConfig.js";
import userRouter from "./routes/userRoute.js";
import accountRouter from "./routes/accountRoute.js";

import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();
dotenv.config();

// app.use(cors({ origin: `http://localhost:3000` }));
// CORS Configuration
const corsOptions = {
  origin: [
    "http://localhost:3000", // For local development
    "https://do-connect-bank-ten.vercel.app/", // Production frontend domain
    "https://do-connect-bank-git-main-vaishali-jains-projects-76f29a1f.vercel.app",
    "https://do-connect-bank-lxt66go3r-vaishali-jains-projects-76f29a1f.vercel.app/",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow these HTTP methods
  credentials: true, // Include cookies and auth headers if needed
};

app.use(cors(corsOptions));


dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "Images")));
app.use(express.static("Images"));

// Testing endpoint
app.get("/", (req, res) => {
  res.send(`Backend : app.js : Testing`);
});

// Route setup
app.use("/user", userRouter);
app.use("/account", accountRouter);

// Error handling middleware
app.use(errorHandler);

const port = process.env.PORT || 1234;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
