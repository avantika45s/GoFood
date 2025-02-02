const express = require("express");
const router = express.Router();
const GroupOrder = require("../models/GroupOrder");

// Route to create a new group order
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

// Route to remove an unpaid user from the group order
router.post("/remove-unpaid-member", async (req, res) => {
    try {
        const { groupOrderId, userId } = req.body;

        let groupOrder = await GroupOrder.findById(groupOrderId);
        if (!groupOrder) return res.status(404).json({ message: "Group order not found" });

        // Find the member who is being removed
        const memberToRemove = groupOrder.members.find(m => m.user.toString() === userId);

        if (!memberToRemove) {
            return res.status(404).json({ message: "User not found in group order" });
        }

        if (memberToRemove.isPaid) {
            return res.status(400).json({ message: "Cannot remove a paid user" });
        }

        // Calculate the amount to be removed
        const removedAmount = memberToRemove.items.reduce((total, item) => {
            return total + item.quantity * item.foodItem.price;
        }, 0);

        // Remove the unpaid user
        groupOrder.members = groupOrder.members.filter(m => m.user.toString() !== userId);
        
        // Update the total amount
        groupOrder.totalAmount -= removedAmount;

        await groupOrder.save();
        return res.status(200).json({ message: "User removed successfully", groupOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
