require('dotenv').config()
import mysql from  'mysql2';
import bluebird from 'bluebird';

const  pool_ = mysql.createPool({
        host: process.env.DB_MYSQL,
        user: process.env.DB_MYSQL_USER,
        database: process.env.DB_MYSQL_DB,
        Promise:bluebird        
    });
const pool = pool_.promise();
//const [rows,fields] = await pool.query("SELECT 1"); //Folma de hacer las consultas
// eslint-disable-next-line no-unused-vars
pool.query("SELECT 1").then(([rows,fields])=>console.log("DB is connent"))//llamamos a la 
.catch(()=>console.log("algo fallo"))
.then(()=>pool.end());
 
pool.query(`INSERT INTO users( username,
    password )
    VALUES (
    'camicasii', '159753'
    )`);
    
export default pool;