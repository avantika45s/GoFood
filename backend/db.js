const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://swift:123456abc@cluster0.zkjgduq.mongodb.net/swift?retryWrites=true&w=majority&appName=Cluster0';


const mongoDB = async () => {
  try {
    // Connect to the MongoDB server
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true 
      
    });
    console.log("Connected to MongoDB");

    // Fetch the data from the "food_items" collection
    const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
    global.food_items = fetched_data;

    // Fetch the data from the "foodCategory" collection
    const catData = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
    global.foodCategory = catData;

    const userData = await mongoose.connection.db.collection("users").find({}).toArray();
    global.users= userData;

  } catch (err) {
    console.error("Error connecting to MongoDB or fetching data:", err);
  }
}

module.exports = mongoDB;
