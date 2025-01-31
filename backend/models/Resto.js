const mongoose = require('mongoose')

const {Schema} =mongoose;

const RestoSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    location:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    }
    
});

module.exports = mongoose.model('Resto', RestoSchema)