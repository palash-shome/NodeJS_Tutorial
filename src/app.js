import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

// Allow requests from certain listed IP 
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

//This Middleware : Allow data limit for each response type JSON 

app.use(express.json({
    limit : "100kb"

}))

//Allow differernt URL ENCODING for reciving data from URL
app.use(express.urlencoded({
    extended:true,
    limit:"100kb"
}))

// Allow assets like images etc files from public folder
app.use(express.static("public"))

//Allow secure use of cookies
app.use(cookieParser({}))


export {app}