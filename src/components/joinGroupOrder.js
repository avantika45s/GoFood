import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JoinGroupOrder = () => {
  const { groupOrderId } = useParams();  // Extract ID from URL
  const [groupOrder, setGroupOrder] = useState(null);

  useEffect(() => {
    const fetchGroupOrder = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/group-order/${groupOrderId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setGroupOrder(data);
      } catch (error) {
        console.error("Error fetching group order", error);
      }
    };

    fetchGroupOrder();
  }, [groupOrderId]);

  return (
    <div>
      {groupOrder ? (
        <div>
          <h2>Group Order at {groupOrder.restaurant.name}</h2>
          <p>Created by: {groupOrder.createdBy.name}</p>
          {/* Add items to cart and pay */}
        </div>
      ) : (
        <p>Loading group order...</p>
      )}
    </div>
  );
};

export default JoinGroupOrder;
