require('dotenv').config()
import express from "express";
//import cors from 'cors';
import session from 'express-session';
import parser from 'body-parser';
import morgan   from 'morgan';
//Connection mongodb
/*import mongodb from  './database/mongodb/dbMongo';
const url_mongo = process.env.DB_MONGO
mongodb(url_mongo)*/
//conecction mysql
import './database/mysql/db_mysql';



//Routers import 
import router_ from './Routers/index';

const app = express();


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
