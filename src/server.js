require('dotenv').config()
import express from "express";
//import cors from 'cors';
// eslint-disable-next-line no-unused-vars
import session from 'express-session';
import parser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan   from 'morgan';


// eslint-disable-next-line no-unused-vars
import  {pool} from './database/mysql/db_mysql';

/*
//para mongodb como session store
import {connectSeccionMongo} from  './database/mongodb/dbMongo';     
const options = connectSeccionMongo(session)
*/

/*
//para Mysql como session store
import  {connectSeccionMysql} from './database/mysql/db_mysql';
const options =connectSeccionMysql(session)

*/

//Routers import 
import router_ from './Routers/index';

const app = express();

app.use(cookieParser())
app.use(morgan("dev"));
app.use(parser.json());//permite usar json
//app.use(cors()); // comentar si usas un proxy
app.use(parser.urlencoded({extended:false}))
app.use(parser.raw())//permite upload file
//app.use(session(options))

app.get('/api',(req,res)=>{
    res.send('Hola');
})

app.use('/api/util',router_)
app.listen(4000,()=>console.log("server"));
