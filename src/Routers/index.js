import { Router } from 'express';
import {User_}  from "../database/mongodb/Schema";
import passport from 'passport';
//import { pool } from '../database/mysql/db_mysql';
const route = Router();

route.post('/singin',passport.authenticate('local.singIn',{session:false}),(req,res)=>{
        return res.json({user:req.user})
    })
route.post('/singup',passport.authenticate('local.singUp',{session:false}),(req,res)=>{
    return res.json({user:req.user})
        })


route.get('/',async (req, res)=>{    
    const data = await User_.find()
    return res.json({data})
})


export default route;