import React, { useState, useEffect } from "react";
import axios from "axios";

const SplitPayment = ({ groupOrderId, userId }) => {
  const [groupOrder, setGroupOrder] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch group order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/groupOrder/${groupOrderId}`);
        setGroupOrder(res.data);
      } catch (error) {
        console.error("Error fetching group order:", error);
      }
    };

    fetchOrder();
  }, [groupOrderId]);

  // Handle Payment
  const handlePayment = async () => {
    if (!amount) {
      alert("Please enter an amount to pay");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`/api/groupOrder/pay/${groupOrderId}/${userId}`, { amount });
      setGroupOrder(res.data);
      alert("Payment successful!");
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Try again.");
    }
    setLoading(false);
  };

  if (!groupOrder) return <p>Loading order details...</p>;

  return (
    <div className="payment-container">
      <h2>Split Payment</h2>
      <p><strong>Restaurant:</strong> {groupOrder.restaurant}</p>
      <p><strong>Total Amount:</strong> ${groupOrder.totalAmount}</p>
      
      <h3>Contributors:</h3>
      <ul>
        {groupOrder.members.map(member => (
          <li key={member.user}>
            {member.user} - Paid: ${member.amountPaid} {member.isPaid ? "✅" : "❌"}
          </li>
        ))}
      </ul>

      <div>
        <input
          type="number"
          placeholder="Enter amount to pay"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handlePayment} disabled={loading}>
          {loading ? "Processing..." : "Pay"}
        </button>
      </div>
    </div>
  );
};

export default SplitPayment;
