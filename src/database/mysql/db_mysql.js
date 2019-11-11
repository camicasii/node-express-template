require('dotenv').config()
import mysql from  'mysql2';
import bluebird from 'bluebird';
import connectMysql from 'connect-mysql';
const options = {
    host: process.env.DB_MYSQL,
    user: process.env.DB_MYSQL_USER,
    database: process.env.DB_MYSQL_DB
    /*user: 'dbuser',
    password: 'dbpassword',*/
}

const  pool_ = mysql.createPool(Object.assign({},options,{Promise:bluebird }));
export const pool = pool_.promise();
//const [rows,fields] = await pool.query("SELECT 1"); //Folma de hacer las consultas
// eslint-disable-next-line no-unused-vars
pool.query("SELECT 1").then(([rows,fields])=>console.log("DB is connent"))//llamamos a la 
.catch(()=>console.log("algo fallo"))
.then(()=>pool.end());
 /*
pool.query(`INSERT INTO users( username,
    password )
    VALUES (
    'camicasii', '159753'
    )`);
*/    
    
export const connectSeccionMysql = session =>{
        const MySQLStore = connectMysql(session);
        let sessionOption = {
            secret:"safgasdgas",
            name:"serverCamicasii",
            resave:false,
            saveUninitialized:true,
            cookie: {
                httpOnly: false,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24 * 3,
                expires: 1000 * 60 * 60 * 24 * 3
              },
            store:null
        }                
        sessionOption.store = new MySQLStore({config:options})        
        return sessionOption;
    }

