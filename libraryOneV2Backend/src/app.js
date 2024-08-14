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
import materialRouter from './routes/journal_Article_Other.routes.js'



//routes declaration
app.use("/api/v1/management", managementRouter)
// app.use("/api/v1/student", studentRouter)
// app.use("/api/v1/book", bookRouter)
// app.use("/api/v1/material", managementRouter)

export {app}