const express = require("express");
const router = express.Router();
const GroupOrder = require("../models/GroupOrder");

router.post("/create", async (req, res) => {
  try {
    const { userId, restaurantId, totalAmount } = req.body;

    const groupOrder = new GroupOrder({
      createdBy: userId,
      restaurant: restaurantId,
      totalAmount,
      members: [],
    });

    await groupOrder.save();

    // Generate the shareable link using the group order's ID
    const groupOrderLink = `https://goFood.com/group-order/${groupOrder._id}`;

    res.status(201).json({ groupOrder, groupOrderLink });
  } catch (error) {
    res.status(500).json({ message: "Error creating group order", error });
  }
});


// Route to create a new group order
router.post("/create", async (req, res) => {
    try {
        const { createdBy, restaurant, totalAmount } = req.body;

        const groupOrder = new GroupOrder({
            createdBy,
            restaurant,
            totalAmount,
            members: [],
        });

        await groupOrder.save();
        res.status(201).send(groupOrder);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Route to join an existing group order
router.post("/join/:orderId", async (req, res) => {
    try {
        const { orderId } = req.params;
        const { userId, items } = req.body;

        let groupOrder = await GroupOrder.findById(orderId);
        if (!groupOrder) return res.status(404).send("Group order not found");

        groupOrder.members.push({ user: userId, items, amountPaid: 0, isPaid: false });
        await groupOrder.save();
        res.status(200).send(groupOrder);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Route to make payment for a group order
router.post("/pay/:orderId/:userId", async (req, res) => {
    try {
        const { orderId, userId } = req.params;
        const { amount } = req.body;

        let groupOrder = await GroupOrder.findById(orderId);
        if (!groupOrder) return res.status(404).send("Group order not found");

        let member = groupOrder.members.find(m => m.user.toString() === userId);
        if (!member) return res.status(404).send("User not found in this group order");

        member.amountPaid = amount;
        member.isPaid = true;

        // Check if all members have paid
        if (groupOrder.members.every(m => m.isPaid)) {
            groupOrder.isCompleted = true;
        }

        await groupOrder.save();
        res.status(200).send(groupOrder);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Route to finalize a group order (only if all payments are complete)
router.post("/finalize/:orderId", async (req, res) => {
    try {
        const { orderId } = req.params;

        let groupOrder = await GroupOrder.findById(orderId);
        if (!groupOrder) return res.status(404).send("Group order not found");

        if (!groupOrder.isCompleted) return res.status(400).send("All members must pay first");

        res.status(200).send({ message: "Group order finalized successfully", groupOrder });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


// Route to get group order details
router.get("/:orderId", async (req, res) => {
    try {
        const { orderId } = req.params;
        let groupOrder = await GroupOrder.findById(orderId);
        if (!groupOrder) return res.status(404).send("Group order not found");

        res.status(200).send(groupOrder);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;
