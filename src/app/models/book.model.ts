import { model, Schema } from 'mongoose';
import { IBook } from '../interfaces/book.interface';

const bookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    copies: {
        type: Number,
        required: true,
        min: [1, 'Copies must be a positive number']
    },
    available: {
        type: Boolean,
        default: true
    },
}, {
    versionKey: false,
    timestamps: true
});

bookSchema.post('save', function (doc) {
    console.log(`New book added "${doc.title}"`);
});

export const Book = model('Book', bookSchema);