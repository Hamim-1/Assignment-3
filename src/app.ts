import express, { Application, Request, Response } from 'express';
import { bookRoutes } from './app/controllers/book.controller';
import { borrowRoutes } from './app/controllers/borrow.controller';
import cors from 'cors';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use('/api', bookRoutes);
app.use('/api', borrowRoutes);
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found',
        error: {}
    });
});





export default app;