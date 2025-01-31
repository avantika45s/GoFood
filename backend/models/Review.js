const mongoose = require('mongoose')

const {Schema}=mongoose;

const ReviewSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: "true"
    },
    foodItem:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItem",
        required: false
    },
    rating:{
        type: Number,
        required:true,
        min:1,
        max:5
    },
    comment:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },

},{
    timestamps: true
});

module.exports = mongoose.model('Resto', ReviewSchema)