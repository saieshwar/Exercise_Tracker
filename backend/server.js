
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

const uri = process.env.Mongo_URI;

mongoose.connect(uri, {useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true});
const connection = mongoose.connection;

connection.once('open', ()=> {
    console.log("MONGO DB Connected ........")
})

const exerciseRouter = require('./routes/ExerciseRouter');
const userRouter = require('./routes/UserRouter');

app.use('/exercises', exerciseRouter)
app.use('/users', userRouter);

app.listen( port, () => {
console.log(`server is running at: ${port}`);

})
