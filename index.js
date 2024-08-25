import dbConfig from './database/db.js';
import mongoose from 'mongoose';
import RoomService from './routes/hotel.routes.js';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;


//เซท database
mongoose.connect(dbConfig.db , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log('Database connection failed');
})

//ใช้งาน cors และ body-parser
app.use(cors());
///set middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//ROutes
app.use('/roomservice' , RoomService);  //เรียกใช้งาน routes



/// Test Routes
app.get('/' ,(req , res) => {
    res.send('Hello World');

})


app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
})

export default app;