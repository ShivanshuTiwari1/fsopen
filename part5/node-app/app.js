import express from 'express';
import cors from 'cors';
import './config/configInitializer.js';
import blogRouter from './controllers/blog.js';
import userRouter from './controllers/users.js';
import loginRouter from './controllers/login.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/login', loginRouter)
app.use('/api/users', userRouter);
app.use('/api/blogs', blogRouter);
export default app;
