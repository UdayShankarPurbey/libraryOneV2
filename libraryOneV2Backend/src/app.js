import expres from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = expres();

app.use(cors({
    origin: process.env.CORS_0RIGIN,
    credentials: true,
}))

app.use(expres.json({limit : '50kb'}))
app.use(expres.urlencoded({extended : true , limit : '50kb'}))
app.use(expres.static("public"))
app.use(cookieParser())
app.use(morgan('dev'))

//routes 

import managementRouter from './routes/management.routes.js'
import studentRouter from './routes/student.routes.js'
import bookRouter from './routes/book.routes.js'
import materialRouter from './routes/material.routes.js'
import { ApiError } from './utils/ApiError.js';



//routes declaration
app.use("/api/v1/management", managementRouter)
app.use("/api/v1/student", studentRouter)
app.use("/api/v1/book", bookRouter)
app.use("/api/v1/material", materialRouter)

// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode || 500).json({
            statusCode: err.statusCode,
            message: err.message,
            errors: err.errors,
            data: null,
            success: err.success
        });
    } else {
        console.error(err); // Log unexpected errors
        return res.status(500).json({
            statusCode: 500,
            message: 'An unexpected error occurred',
            errors: [],
            data: null,
            success: false
        });
    }
});


export {app}