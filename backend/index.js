import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {Book} from './models/bookModel.js';
import booksRouter from './routes/bookRoutes.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body - using Postman.
app.use(express.json());
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to the backend of the bookstore!');
});

// Middleware for handling CORS policy:
// Option 1: Allow all origins with Default of cors(*)
app.use(cors());

// Option 2: Allow custom origins
// app.use(
//     cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//     })
// );

// Route to booksRouter
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