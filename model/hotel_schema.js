const mongoose=require('../database/db');
const Schema = mongoose.Schema

var hotel_schema=  new Schema({
    hotel_name: {
       type: String,
       required: true,
       trim: true
    },
    description: {
        type: String,
        // required: true,
        trim: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        // required: true
    },
    contactNo: {
        type: Number,
        trim: true
    },
    checkIn: {
        type: Date,
    },
    checkOut: {
        type: Date,
    },
    rent: {
        type: Number,
        maxLength: [8, "Price cannot exteed 8 charactor"]
    },
    hotelType:{
        type: String,
        enum : ['hotels','hostels', 'vacation'],
        default: 'hotels'
    },
    guest:{
        type: Number,
        maxLength: [5, "One room maximum guest only 5"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: null
    },
    serviceId: {
        type: mongoose.Schema.ObjectId,
        ref: "Service",
        required: [false, "please enter your service Id"],
        strictPopulate: false
    },
    // images: [
    //     {
    //         public_id: {
    //         type: String,
    //         required: true,
    //         },
    //         url: {
    //             type: String,
    //             required: true,
    //         } 
    //     }
    // ],
        // role:{
    //     type: String,
    //     enum : ['user','admin'],
    //     default: 'user'
    // },

}, {
    timestamps: true
});

const Hotel=mongoose.model('Hotel', hotel_schema);
module.exports= Hotel;