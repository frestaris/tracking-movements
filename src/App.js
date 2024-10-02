import React, { useState } from "react";
import BudgetForm from "./components/BudgetForm";
import BudgetSummary from "./components/BudgetSummary";
import logo from "./assets/budget.png";

const App = () => {
  const [budgets, setBudgets] = useState([]);

  const addBudget = (budget) => {
    setBudgets([...budgets, budget]);
  };

  const formattedAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="app-container">
      <div className="header">
        <img className="logo" src={logo} alt="logo" />
        <h1>Budget Planner</h1>
      </div>
      <BudgetForm addBudget={addBudget} />
      <BudgetSummary budgets={budgets} formattedAmount={formattedAmount} />
    </div>
  );
};

export default App;
