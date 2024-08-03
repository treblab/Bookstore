import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {Book} from './models/bookModel.js';
import booksRouter from './routes/bookRoutes.js';

const app = express();

// Middleware for parsing request body - using Postman.
app.use(express.json());
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to the backend of the bookstore!');
});

app.use('/books', booksRouter);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })