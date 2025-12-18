import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import app from './app.js';
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((error) => {
    console.log("DB CONNECTION ERROR :", error.message);
    process.exit(1);
  });
