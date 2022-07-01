const Bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User= require('../model/user_schema');


//signup user
const signup= async (req,res)=>{
    try{
        const {
            name,
            email,
            mobile,
            password,
            confirm_password
        }= req.body;
        if(!name || !email || !mobile || !password || !confirm_password){
            console.log("please fill all fields");
        }

        console.log(req.body)
        const userExits= await User.find({email: email}).exec()
        console.log("userExits", userExits)
        if(userExits.length>0){
            console.log("userExits", userExits)
            return res.send("already exit")
            // res.send("email is already exits in your db...")
        }else{
            const user= new User({name, email, mobile, password, confirm_password})
            // console.log("user...", user)
            await user.save();
            res.status(200).send({message:"inserted data success"});
        }
    }
    catch(err){
        console.log(err.message)
        console.log("This mail already exists please login.............");
        res.status(200).send({message:"email allready exits please login.."});

    }
}


//login
const login= async (req,res)=>{
    try{
        const {email, password}=req.body;
        if(!email || !password){
            res.status(400).send("please fill the data...");
        }
        const mail= await User.findOne({email: email})
        // console.log("mail", mail)
        if(mail){
            const isMatch=await Bcrypt.compare(password, mail.password);
            console.log("encrypted password match success!")
            // let token =await jwt.sign({ user_detail: mail }, "aijajkhan", {expiresIn: 86400 }); // expires in 24 hours
            let token= await mail.generateAuthToken();
            console.log("token.....", token)

            // res.cookie('token', token, {
            //     expires: new Date(Date.now() + 300000000),
            //     secure: false, // set to true if your using https
            //     httpOnly: true,
            //   });

            res.cookie("jwtToken", token, {
                expires: new Date(Date.now()+ 300000000),
                httpOnly: true
            });
            if(!isMatch){
                res.status(400).send({error: "Invalid Credentials"})
            }else{
                res.send({
                    token: token,
                    user_detail: mail,
                    message: "login Success"
                })
            }
        }else{
            res.status(400).send({error: "email not found"})
        }     
    }
    catch(err){
        console.log(err.message)
        res.send("there is problem to login...")
    } 
}

//all users information
const allUsers= async (req,res)=>{
    try{
        const allData=await User.find()
        console.log("allData", allData)
        if(allData.length>0){
            return res.send(allData)
        }
    }
    catch(err){
        console.log(err.message)
    }
}


const about= async(req,res)=>{
    console.log("about page open");
    res.send(req.userRouter);
}

// home page
const home= async(req,res)=>{
    console.log("hello about page...")
    res.send(req.userRouter);
}


//logout page
const logout= async(req,res)=>{
    console.log("logout")
    res.clearCookie("jwtToken", {path: '/'})
    res.status(200).send("user logout");
}


//update service information
const updateUser= async(req,res)=>{
    try{
        const {name,description,email,mobile,roomType, rate}=req.body
        console.log("req.body", req.body)
        const updateData= await User.findByIdAndUpdate({_id: req.params.id}, {
            $set:{
                name,email,description,rate,mobile,roomType
            }
        })
        console.log("updateData", updateData)
        res.send({status: "update data successfully! ", "result": updateData})
    }
    catch(err){
        console.log(err.message)
    }
}


//user details
const userDetails= async (req, res)=>{
    try{
        console.log(req.params._id)
        const userData= await User.findById({
            _id: req.params.id
        })
        if (!userData || userData==undefined){ 
            return  res.send("not found userDtails")
        }
        return res.status(200).send({
            message:"user resitered save data", 
            data: userData
        })
    }
    catch(err){
        console.log(err.message)
    }   
}

module.exports={
    signup,
    login,
    logout,
    home,
    about,
    allUsers,
    updateUser,
    userDetails
}