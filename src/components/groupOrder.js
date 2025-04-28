import React, { useState } from "react";

const GroupOrder = () => {
  const [groupOrderLink, setGroupOrderLink] = useState("");

  const createGroupOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/group-order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: "USER_ID_HERE",
          restaurantId: "RESTAURANT_ID_HERE",
          totalAmount: 500  // Example total amount
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGroupOrderLink(data.groupOrderLink);
      
    } catch (error) {
      console.error("Error creating group order:", error);
    }
  };

  return (
    <div>
      <button onClick={createGroupOrder}>Create Group Order</button>

      {groupOrderLink && (
        <div>
          <p>Share this link with friends:</p>
          <input type="text" value={groupOrderLink} readOnly />
          <button onClick={() => navigator.clipboard.writeText(groupOrderLink)}>Copy Link</button>
        </div>
      )}
    </div>
  );
};

export default GroupOrder;
