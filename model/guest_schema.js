const mongoose=require('../database/db');
const Schema = mongoose.Schema

var guest_schema=  new Schema({
    guestName: {
       type: String,
       required: true,
       trim: true
    },
    address: {
        type: String,
        trim: true
    },
    mobile: {
        type: Number,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    guestPass:{
        type: String,
        trim:true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: null
    },
}, {
    timestamps: true
});

const Guest=mongoose.model('Guest', guest_schema);
module.exports= Guest;