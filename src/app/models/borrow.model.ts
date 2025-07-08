import { model, Schema } from 'mongoose';
import { BorrowStaticMethod, IBorrow } from '../interfaces/borrow.interface';
import { Book } from './book.model';


const borrowSchema = new Schema<IBorrow, BorrowStaticMethod>({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    quantity: {
        type: Number,
        min: 1,
        required: true
    },
    dueDate: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false
});

borrowSchema.static('validateAndUpdateAvailability', async function (bookId, quantity) {
    const book = await Book.findById(bookId);
    if (!book) {
        const error = new Error('Book not found') as Error & { statusCode?: number };
        error.statusCode = 404;
        throw error;
    }
    if (book.copies < quantity) {
        const error: unknown = new Error('Not enough copies available to borrow');
        throw error;
    }
    const isLeftCopies = quantity !== book.copies;
    await Book.findByIdAndUpdate(bookId,
        {
            available: isLeftCopies,
            $inc: { copies: -quantity }
        });
    return true;


});

export const Borrow = model<IBorrow, BorrowStaticMethod>('Borrow', borrowSchema);