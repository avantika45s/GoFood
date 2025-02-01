const mongoose = require("mongoose");

const {Schema} =mongoose;


const groupOrderSchema = new Schema({
  createdBy: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: "User", 
     required: true },
  restaurant: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Restaurant", 
    required: true },
  members: [
    {
      user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" },
      items: [
        {
          foodItem: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "FoodItem" },
          quantity: { 
            timestampsype: Number, 
            required: true, 
            default: 1 },
        }
      ],
      amountPaid: { 
        type: Number, 
        default: 0 },
      isPaid: { 
        type: Boolean, 
        default: false }
    }
  ],
  totalAmount: { 
    type: Number, 
    required: true },
  isCompleted: { 
    type: Boolean, 
    default: false },
}, { 
    timestamps: true
 });

module.exports = mongoose.model("GroupOrder", groupOrderSchema);
