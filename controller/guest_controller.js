const Guest= require('../model/guest_schema')

//add guest
const addGuest= async (req, res)=>{
    try{
        const hotelData= await Guest.create(req.body)
        return res.status(200).send({
            message:"guest create success!", 
            data: hotelData
        })
    }
    catch(err){
        console.log(err.message)
    }   
}


//see all guest
const allGuest= async (req, res)=>{
    try{
        const showData= await Guest.find()
        return res.status(200).send({
            message:"get all information guest!", 
            data: showData
        })
    }
    catch(err){
        console.log(err.message)
    }   
}


// get guest inforation using id
const guestDetails= async (req, res)=>{
    try{
        console.log(req.params._id)
        const guestData= await Guest.findById({
            _id: req.params.id
        })
        if (!guestData || guestData==undefined){ 
            return  res.send("not found userDtails")
        }
        return res.status(200).send({
            message:"user resitered save data", 
            data: guestData
        })
    }
    catch(err){
        console.log(err.message)
    }   
}


// delete guest information
const deleteGuest= async (req, res)=>{
    try{    
        const deleteInf=await Guest.findByIdAndRemove({_id: req.params.id});
        console.log("delete successfully!", deleteInf)
        return res.send({message: "delete successfully!", status: "success"})
    }catch(err){
        console.log(err.message)
    }
}

module.exports={
    addGuest,
    allGuest,
    guestDetails,
    deleteGuest
}