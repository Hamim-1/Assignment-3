import express, { Request, Response } from 'express';
import { Borrow } from '../models/borrow.model';
import mongoose from 'mongoose';
import { sendError } from '../utils/errorHandler';

export const borrowRoutes = express.Router();

borrowRoutes.post('/borrow', async (req: Request, res: Response) => {

    const body = req.body;

    if (!mongoose.Types.ObjectId.isValid(body.book)) {
        return sendError(res, 'Invalid Book ID', {});
    }

    try {
        await Borrow.validateAndUpdateAvailability(body.book, body.quantity);

        const borrowedBook = await Borrow.create(body);
        res.json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrowedBook
        });
    } catch (err: unknown) {
        const error = err as Error & { statusCode?: number };
        if (error.name === 'ValidationError' || error.name === 'CastError') {
            error.message = 'Validation failed';
        }
        return sendError(res, error.message || 'Failed to borrow book', error, error.statusCode);
    }

});

borrowRoutes.get('/borrow', async (req: Request, res: Response) => {
    try {
        const result = await Borrow.aggregate([
            {
                $lookup: {
                    from: 'books',
                    localField: 'book',
                    foreignField: '_id',
                    as: 'bookDetails'
                }
            },
            {
                $project: {
                    book: { $arrayElemAt: ['$bookDetails', 0] },
                    quantity: 1
                }
            },
            {
                $group: {
                    _id: '$book._id',
                    book: { $first: '$book' },
                    totalQuantity: { $sum: '$quantity' }
                }
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: '$book.title',
                        isbn: '$book.isbn'
                    },
                    totalQuantity: 1
                }
            }
        ]);
        res.json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: result
        });
    } catch (error) {
        sendError(res, 'Failed to retrieve borrowed books summary', error, 500);
    }
});