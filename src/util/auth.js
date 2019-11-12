import passport from 'passport';
import passportLocal from 'passport-local';
import { pool } from '../database/mysql/db_mysql';
import helpers from "./bcryptHast";

const LocalStrategy = passportLocal.Strategy;

passport.use('local.singIn',
new LocalStrategy({
    usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
},
async ( req, username, password, done)=>{        
  console.log(username, password);
  
    const isUser_ = await isUser(username)    
    if(isUser_){        
        const ID = isUser_[0].ID
        const isPassword_ =await isPassword(password,ID)
        if (isPassword_){
            const user = isUser_[0];
            return done(null,user);    
        }
        else return done(null, false);
    }      
    return done(null, false);        
}
));

passport.use('local.singUp',
new LocalStrategy({
    usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
},
async ( req, username, password, done)=>{   
    
    const isUser_ =await isUser(username)     
    
    if(!isUser_){                
        const user = await createUser(username,password);
        if(user)
        return done(null,user);
        else
        return done(null,false);
     }
     else
     return done(null,false);        
   }     
));






passport.serializeUser((user, done) => {
    done(null, user.ID);
  });
  
  passport.deserializeUser(async (ID, done) => {
    const [rows] = await pool.query("SELECT ID, username FROM `USERS` WHERE ID =?",[ID]);    
//    console.log(user[0].ID);
    return done(null, rows[0]);
  });

  const isUser =async(username)=>{
    const [rows] = await pool.query("SELECT ID, username FROM `USERS` WHERE username =?",[username]);
    if(rows.length > 0) return [rows[0]];
    else return false;
  }
  const isPassword=async(password,ID)=>{      
    const [rows] = await pool.query("SELECT PASSWORD FROM `USERS` WHERE ID =?",[ID]);
    const passportSave =rows[0].PASSWORD     
    const isPassword_ = await helpers.desEncrypt(password,passportSave)    
    return isPassword_
  }


  const createUser =async(username,password)=>{    
    const encryptPassword  =await helpers.encrypt(password);
    const newUser ={
        username,
        PASSWORD:encryptPassword
    }        
    const rows = await pool.query("INSERT INTO USERS SET ?",newUser)
    .then(res=>{                
            const  user={
                    ID:res[0].insertId,
                    username
                };
             return  user;
    })
    .catch(()=>false);
    
    return rows;
  }