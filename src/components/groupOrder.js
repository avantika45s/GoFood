import React, { useState } from "react";

const GroupOrder = () => {
  const [orderId, setOrderId] = useState("");

  const handleCreateOrder = async () => {
    const res = await fetch("/api/groupOrders/create", {
      method: "POST",
      body: JSON.stringify({ createdBy: "USER_ID", restaurant: "RESTAURANT_ID", totalAmount: 500 }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setOrderId(data._id);
  };

  return (
    <div>
      <button onClick={handleCreateOrder}>Start Group Order</button>
      <p>Order ID: {orderId}</p>
    </div>
  );
};

export default GroupOrder;
