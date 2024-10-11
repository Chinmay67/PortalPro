import express from "express";
import cors from "cors"
import passport from 'passport'
import cookieParser from "cookie-parser"
import './config/passportConfig.js'
const app=express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:'true',limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(passport.initialize())

import authRoutes from './routes/auth.routes.js'
import customerRoutes from './routes/customer.routes.js' 
import adminRoutes from './routes/admin.routes.js'

app.use('/auth', authRoutes);
app.use('/customers', customerRoutes);
app.use('/admin',adminRoutes)

// Serve PDFs
app.use('/pdfs', express.static('pdfs'));

export {app}