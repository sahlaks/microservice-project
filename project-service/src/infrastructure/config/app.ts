import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from 'cookie-parser';
import projectRouter from "../../presentation/routes/projectRoutes";
import { errorHandler } from "../../presentation/middleware/erorHandler";
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use((req, res, next) => {
  console.log('Cookies:', req.cookies);
  next();
});

app.use("/api/project", projectRouter);
app.use(errorHandler);

export const server = http.createServer(app);
