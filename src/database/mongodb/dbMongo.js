require('dotenv').config()
import mongoose from  'mongoose';
import connection from 'connect-mongo';
const url_mongo = process.env.DB_MONGO
mongoose.Promise =global.Promise;
export const mongo = mongoose;
mongo.connect(url_mongo,{
    useUnifiedTopology: true ,
    useNewUrlParser: true ,
    useFindAndModify:false//con esta opcion activa podemos usar comodamente el metodo patch
})
.then(()=>console.log("db_connect"))
.catch(()=>console.log("db_Not_connect"))

//funcion para configurar express-Session con mongodb como store 
//inicial mongo anstes que esta funcion.
export const connectSeccionMongo = session =>{
    const MongoStore=connection(session)
    let sessionOption = {
        secret:"safgasdgas",
        name:"serverCamicasii",
        resave:false,
        saveUninitialized:true,
        store:null
    }
    sessionOption.store = new MongoStore({ mongooseConnection:mongo.connection});            
    return sessionOption;
}