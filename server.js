import express from "express";
import router from "./routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use("/", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
