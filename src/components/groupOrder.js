import React, { useState } from "react";
import axios from "axios";

const GroupOrder = () => {
  const [groupOrderLink, setGroupOrderLink] = useState("");

  const createGroupOrder = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/group-order/create", {
        userId: "USER_ID_HERE",
        restaurantId: "RESTAURANT_ID_HERE",
        totalAmount: 500,  // Example total amount
      });

      setGroupOrderLink(response.data.groupOrderLink);
    } catch (error) {
      console.error("Error creating group order", error);
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
