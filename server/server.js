import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import cors from "cors";
import colors from "colors";
import connectDB from "./config/db.js";
import { DEVELOPMENT } from "./config/constants.js";
import { errorHandler, notFound } from "./middleware/errorMIddleware.js";

import toDoRoutes from "./routes/todo/toDoRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());

if (process.env.NODE_ENV === DEVELOPMENT) app.use(morgan("dev"));

app.use(express.json());

app.use("/api/todos", toDoRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
