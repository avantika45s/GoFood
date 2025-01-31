import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    }, 

    restaurant: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Restaurant", 
      required: true 
    }, 

    items: [
      {
        foodItem: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "FoodItem", 
          required: true 
        }, 
        quantity: { 
          type: Number, 
          required: true, 
          min: 1 
        } 
      }
    ],

    totalAmount: { 
      type: Number, 
      required: true 
    }, 

    status: {
      type: String,
      enum: ["pending", "preparing", "out for delivery", "delivered", "cancelled"],
      default: "pending"
    }, 

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending"
    }, 

    paymentMethod: {
      type: String,
      enum: ["cash", "credit_card", "UPI", "wallet"],
      required: true
    }, 

    deliveryAddress: { 
      type: String, 
      required: true 
    }, 
    orderedAt: { 
      type: Date, 
      default: Date.now 
    }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema)
