import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import swaggerSpec from "./swagger.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Swagger UI — CSP is relaxed only for this route; all other routes keep Helmet's defaults
app.use(
  "/api/docs",
  (_req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Content-Security-Policy", "");
    next();
  },
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "Notes App — API Docs",
  }),
);

app.use("/api/v1", routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
