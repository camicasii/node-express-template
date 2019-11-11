import { Router } from 'express';
import {User_}  from "../database/mongodb/Schema";

const route = Router();

route.post('/',(req, res)=>{
    console.log(req);
    return res.send("ready")
})



route.get('/',async (req, res)=>{    
    const a = await User_.find()
    console.log(a);
    
    return res.send("ready")
})

export default route;