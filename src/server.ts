import app from './app';
import mongoose from 'mongoose';


const PORT = 5000;
const uri = "mongodb+srv://hamim:hamim@cluster0.1sinhnc.mongodb.net/books?retryWrites=true&w=majority&appName=Cluster0";
async function main(): Promise<void> {
    try {
        await mongoose.connect(uri);

        app.listen(PORT, () => {
            console.log('listening port 5000');

        });
    } catch (error) {
        console.log(error);

    }
}

main();