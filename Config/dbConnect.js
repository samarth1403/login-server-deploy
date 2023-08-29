import mongoose from 'mongoose';

const dbconnect = () => {
   try {
    mongoose.connect(process.env.CONNECTION_URL);
    console.log("Database Connected Successfully");
   } catch (error) {
    console.log("Database Connection Error");
   }
}

export default dbconnect;