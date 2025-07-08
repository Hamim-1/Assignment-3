import express, { Request, Response } from 'express';
import { Book } from '../models/book.model';
import { sendError } from '../utils/errorHandler';
import mongoose from 'mongoose';

export const bookRoutes = express.Router();

bookRoutes.post('/books', async (req: Request, res: Response) => {
    const body = req.body;
    try {
        const book = await Book.create(body);
        res.json({
            success: true,
            message: 'Book created successfully',
            data: book
        });
    } catch (error) {
        sendError(res, 'Validation failed', error);
    }
});

bookRoutes.get('/books', async (req: Request, res: Response) => {
    try {
        const query: Record<string, unknown> = {};
        const sortOption: Record<string, 1 | -1> = {};
        const { filter, sortBy, sort, limit = 10 } = req.query;
        if (filter) {
            query.genre = filter;
        }
        if (sortBy && sort) {
            sortOption[sortBy as string] = sort === 'desc' ? -1 : 1;
        }
        const books = await Book.find(query).limit(Number(limit)).sort(sortOption);

        res.json({
            success: true,
            message: 'Books retrieved successfully',
            data: books
        });
    } catch (error) {
        sendError(res, 'Failed to retrieve books', error, 404);
    }
});

bookRoutes.get('/books/:bookId', async (req: Request, res: Response) => {


    try {
        const { bookId } = req.params;
        const books = await Book.findById(bookId);
        if (!books) {
            return sendError(res, 'Book not found', {}, 404);
        }
        res.json({
            success: true,
            message: 'Books retrieved successfully',
            data: books
        });
    } catch (error) {
        sendError(res, 'Failed to retrieve books', error, 404);
    }
});


bookRoutes.patch('/books/:bookId', async (req: Request, res: Response) => {
    const { bookId } = req.params;
    const body = req.body;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return sendError(res, 'Invalid Book ID', {});
    }

    try {

        const updatedBook = await Book.findByIdAndUpdate(bookId, body, {
            new: true
        });

        if (!updatedBook) {
            return sendError(res, 'Book not found', {}, 404);
        }

        res.json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook,
        });
    } catch (error) {
        sendError(res, 'Failed to update book', error);
    }
});


bookRoutes.delete('/books/:bookId', async (req: Request, res: Response) => {
    const { bookId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return sendError(res, 'Invalid Book ID', {});
    }
    try {
        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return sendError(res, 'Book not found', {}, 404);
        }

        res.json({
            'success': true,
            'message': 'Book deleted successfully',
            'data': null
        });
    } catch (error) {
        res.json({
            message: 'Failed to delete book',
            success: false,
            error
        });
    }
});