import { Model, Types } from 'mongoose';

export interface IBorrow {
    book: Types.ObjectId,
    quantity: number,
    dueDate: Date,
}
export interface BorrowStaticMethod extends Model<IBorrow> {
    validateAndUpdateAvailability(bookId: string, quantity: number): boolean
}