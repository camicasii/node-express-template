import mongoose from  'mongoose';


mongoose.Promise =global.Promise;
const mongodb=(db_url)=>{
mongoose.connect(db_url,{
    useUnifiedTopology: true ,
    useNewUrlParser: true ,
    useFindAndModify:false//con esta opcion activa podemos usar comodamente el metodo patch
})
.then(()=>console.log("db_connect"))
.catch(()=>console.log("db_Not_connect"))
}


export default mongodb;
