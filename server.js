const express = require('express')
const bodyParser=require('body-parser');
const app = express()
const cors= require('cors')
const cookieParser= require('cookie-parser')
const dotenv= require('dotenv')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname)); 
app.use(cors());
app.use(cookieParser());

dotenv.config({path: './config.env'})

let routes=require('./routes/index')
app.use('/', routes);

if(process.env.NODE_ENV=="production"){
    app.use(express.static("hotel_app/build"))
}

var port = process.env.PORT || 5001;
app.listen(port, ()=>{
    console.log(`server is listening this ${port}`);
});