import React, { useState } from "react";

const BudgetForm = ({ addBudget }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [frequency, setFrequency] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description && amount && category && frequency) {
      const amountValue = parseFloat(amount);
      const adjustedAmount = category === "income" ? amountValue : -amountValue;
      console.log("Adding budget item:", {
        description,
        adjustedAmount,
        category,
        frequency,
      });
      addBudget({ description, amount: adjustedAmount, category, frequency });
      setDescription("");
      setAmount("");
      setCategory("");
      setFrequency("");
    }
  };

  return (
    <form className="budget-form" onSubmit={handleSubmit}>
      <h2>Your Budget</h2>
      <div className="inputs">
        <input
          type="text"
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount..."
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        <option value="income">Income</option>
        <option value="home & utilities">Home & Utilities</option>
        <option value="insurance & financial">Insurance & Financial</option>
        <option value="groceries">Groceries</option>
        <option value="personal & medical">Personal & Medical</option>
        <option value="entertainment">Entertainment</option>
        <option value="children">Children</option>
      </select>
      <select
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
        required
      >
        <option value="">Select Frequency</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="annually">Annually</option>
      </select>
      <button className="button-form" type="submit">
        Add Budget Item
      </button>
    </form>
  );
};

export default BudgetForm;
