const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

// 📌 Get all restaurants
router.get("/", async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// 📌 Get a restaurant by ID
router.get("/:id", async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).json({ msg: "Restaurant not found" });

        res.json(restaurant);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// 📌 Add a new restaurant
router.post("/", async (req, res) => {
    try {
        const { name, location, cuisine, menu } = req.body;
        const newRestaurant = new Restaurant({
            name,
            location,
            cuisine,
            menu
        });

        await newRestaurant.save();
        res.status(201).json(newRestaurant);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// 📌 Update a restaurant by ID
router.put("/:id", async (req, res) => {
    try {
        const { name, location, cuisine, menu } = req.body;
        let restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).json({ msg: "Restaurant not found" });

        restaurant.name = name || restaurant.name;
        restaurant.location = location || restaurant.location;
        restaurant.cuisine = cuisine || restaurant.cuisine;
        restaurant.menu = menu || restaurant.menu;

        await restaurant.save();
        res.json(restaurant);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// 📌 Delete a restaurant by ID
router.delete("/:id", async (req, res) => {
    try {
        let restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).json({ msg: "Restaurant not found" });

        await restaurant.remove();
        res.json({ msg: "Restaurant removed" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
