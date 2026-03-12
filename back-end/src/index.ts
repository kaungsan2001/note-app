import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(helmet());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
