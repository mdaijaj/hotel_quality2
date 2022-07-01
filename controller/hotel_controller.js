const Hotels= require('../model/hotel_schema')
const { search } = require('../routes')

//add hotel admin only
const addHotel= async (req, res)=>{
    try{
        console.log("req.body", req.body.hotelInf)
        const hotelInfo= req.body.hotelInf
        const hotelData= await Hotels.create({
            hotel_name: hotelInfo.hotel_name, 
            description: hotelInfo.description, 
            email: hotelInfo.email,
            address: hotelInfo.address,
            contactNo: hotelInfo.contactNo,
            rent: hotelInfo.rent,
            hoteltype:  hotelInfo.hotelType,
            role: hotelInfo.role,
            guest: hotelInfo.guest,
            checkIn: hotelInfo.startDate,
            checkOut: hotelInfo.endDate,
            state: hotelInfo.state,
            city: hotelInfo.city
        })
        console.log("kishan", hotelData)
        return res.status(200).send({
            message:"admin hotel add succuess", 
            data: hotelData
        })
    }
    catch(err){
        console.log(err.message)
    }   
}


// all hotels get information
const allHotels= async (req, res)=>{
    try{
        const hotelData= await Hotels.find()
        console.log('hotelData', hotelData)
        return res.status(200).send({
            message:"get all hotel list ", 
            data: hotelData
        })
    }
    catch(err){
        console.log(err.message)
    }   
}


// one hotel get details
const hotelDetails= async (req, res)=>{
    try{
        console.log(req.params._id)
        const hotelData= await Hotels.findById({
            _id: req.params.id
        })
        if (!hotelData || hotelData==undefined){ 
            return  res.send("not found hotel")
        }
        return res.status(200).send({
            message:"user resitered save data", 
            data: hotelData
        })
    }
    catch(err){
        console.log(err.message)
    }   
}

    
//update hotel information
const updateHotel= async(req,res)=>{
    try{
        const {hotel_name,description,price,images,hotelType}=req.body
        const updateData= await Hotels.findByIdAndUpdate({_id: req.params.id}, {
            $set:{
                hotel_name,description,price,images,hotelType
            }
        })
        console.log("updateData", updateData)
        res.send({status: "update data successfully! ", "result": updateData})
    }
    catch(err){
        console.log(err.message)
    }
}


//delete hotels details
const deleteHotel= async (req, res)=>{
    try{    
        const deleteInf=await Hotels.findByIdAndRemove({_id: req.params.id});
        console.log("delete successfully!", deleteInf)
        return res.send({message: "delete successfully!", status: "success"})
    }catch(err){
        console.log(err.message)
    }
}


//search hotel
const searchHotel= async(req,res)=>{
    try{
        const {city, hotelType, guest, checkIn, checkOut}= req.query
        const searchInfo= await Hotels.find({
            destination: city,
            hotelType: hotelType,
        })
        console.log("searchInfo", searchInfo)
        return res.send({
            message: "find hotel successfully!", data: searchInfo
        })
    }catch(err){
        console.log(err.message)
    }
}


module.exports= {
    addHotel,
    allHotels,
    hotelDetails,
    updateHotel,
    deleteHotel,
    searchHotel
}