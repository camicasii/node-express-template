require('dotenv').config()
import express from "express";
import session from 'express-session';
import parser from 'body-parser';
import morgan   from 'morgan';
import mongodb from  './database/mongodb/dbMongo';
import router_ from './Routers/index';
//import cors from 'cors';
const app = express();
const url_mongo = process.env.DB_MONGO
mongodb(url_mongo)


app.use(morgan("dev"));
app.use(parser.json());//permite usar json
//app.use(cors());
app.use(parser.urlencoded({extended:false}))
app.use(parser.raw())//permite upload file
app.use(session({
    secret:"safgasdgas",
    name:"serverCamicasii",
    resave:false,
    saveUninitialized:true
}))

app.get('/api',(req,res)=>{
    res.send('Hola');
})

app.use('/api/util',router_)
app.listen(4000,()=>console.log("server"));
