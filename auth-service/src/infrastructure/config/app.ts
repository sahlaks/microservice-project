import express from 'express';
import http from 'http';
import cors from 'cors';
import authRouter from '../../presentation/routes/authRoutes';
import { errorHandler } from '../../presentation/middlewares/errorHandler';

const app = express();
app.use(cors({
    origin:"http://localhost:3000",
    methods:["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', authRouter);
app.use(errorHandler);

export const server = http.createServer(app); 