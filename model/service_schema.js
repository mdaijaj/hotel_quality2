const mongoose=require('../database/db');
const Schema = mongoose.Schema

var hotelServiceSchema=  new Schema({
    amenities: {
        type: String,
        trim: true
    },
    meals: {
       type: String,
       enum :['breakfast', 'lunch', 'dinner', 'drink'],
       default: 'lunch'
    },
    roomType: {
        type: String,
        enum :['single bed', 'double bed', 'three badroom', 'hallroom', 'familyroom', 'villa'],
        default: 'double bed'
    },
    basic: {
        type: String,
        trim: true
    },
    health: {
        type: String,
    },
    transport:{
        type:String
    },
    funThings: {
        type: String,
    },
    hotelId: {
        type: mongoose.Schema.ObjectId,
        ref: "Hotel",
        required: [false, "please enter your hotel"],
        strictPopulate: false
    },
    images: [
        {
            public_id: {
            type: String,
            required: true,
            },
            url: {
                type: String,
            } 
        }
    ],
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: null
    }
}, {
    timestamps: true
});

const Service=mongoose.model('Service', hotelServiceSchema);
module.exports= Service;