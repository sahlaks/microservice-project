import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));


//@proxy for auth-service 
app.use('/api/auth', 
    createProxyMiddleware({
    target:process.env.AUTH_SERVICE_URL,
    changeOrigin: true, 
     pathRewrite: {
    '^/api/auth': '',
  },
})
)

//@proxy for project-service 
app.use('/api/project', 
    createProxyMiddleware({
    target:process.env.PROJECT_SERVICE_URL,
    changeOrigin: true, 
     pathRewrite: {
    '^/api/project': '',
  },
})
)


//@server is running at 5000
app.listen(process.env.PORT,()=>{
    console.log(`API Gateway running at ${process.env.PORT}`);
})
