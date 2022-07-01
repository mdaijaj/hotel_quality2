const mongoose=require('mongoose');
// require('dotenv').config;
// dotenv.config({path: './db.js'})

mongoose.connect('mongodb+srv://aijaj:r6qM9ZRCTK0VHYGe@cluster0.2jomo.mongodb.net/hotelmanagement?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser:true,
}).then(()=>{
    console.log("db connected successfully!")
}).catch((err)=>{
    console.log("errro while connected db,........")
    console.log(err.message)
})



module.exports=mongoose;