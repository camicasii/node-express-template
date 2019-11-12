require('dotenv').config()
import express from "express";
import cors from 'cors';
// eslint-disable-next-line no-unused-vars
import session from 'express-session';
import path from 'path';
import parser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan   from 'morgan';
import passport from 'passport';
import './util/auth'


// eslint-disable-next-line no-unused-vars
//import  {pool} from './database/mysql/db_mysql';

/*
//para mongodb como session store
import {connectSeccionMongo} from  './database/mongodb/dbMongo';     
const options = connectSeccionMongo(session)
*/


//para Mysql como session store
import  {connectSeccionMysql} from './database/mysql/db_mysql';
const options =connectSeccionMysql(session)

//Routers import 
import router_ from './Routers/index';

const app = express();

app.use(cookieParser())
app.use(morgan("dev"));
app.use(parser.json());//permite usar json
app.use(cors()); // comentar si usas un proxy
app.use(parser.urlencoded({extended:false}))
app.use(parser.raw())//permite upload file
app.use(session(options))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname +'/build')))

//si usas react angular o vue el * hace que el router sea consistente
app.get('*',(req,res)=>{ 
    console.log("paso paso");
    console.log(
     req.isAuthenticated(), "auth")
    res.sendFile(path.join(__dirname +'/build/index.html'))
})
app.get('/a',(req,res)=>{
    console.log("paso paso");
    console.log(
     req.isAuthenticated(), req.user, "auth")
    res.send("sadfsadf")
})

app.use('/api/util',router_)
app.listen(4000,()=>console.log("server"));
