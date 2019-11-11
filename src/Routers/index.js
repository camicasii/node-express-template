import { Router } from 'express';
import {User_}  from "../database/mongodb/Schema";

const route = Router();

route.post('/',async(req, res)=>{
    const data = req.body;
    const username = data.username;
    const password = data.password;
    if(username===undefined ||password===undefined) return res.status(402).json("status:campo invalido");
    const isUser = await User_.find({username:username})
    if(isUser.length<1  ){        
        const newUser = new User_(data);
        await newUser.save();        
        return res.status(200).json("status:Create User")
    }
    else{
        return res.status(401).json("status:User Or password invalidate")
    }
})



route.get('/',async (req, res)=>{    
    const data = await User_.find()
    return res.json({data})
})

export default route;