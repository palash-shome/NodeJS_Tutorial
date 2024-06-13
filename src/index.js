//require ('dotenv').config({path: './env'})

import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './.env',
})

connectDB()
.then(()=>{
    const port = process.env.PORT || 3000
    app.listen(port, ()=>{
        console.log(`App running on Port : ${port}`);
    })
})
.catch((err)=>{
    console.log("DB Connection Error!!!!", err)
})