import React, { useState } from "react";
import BudgetForm from "./components/BudgetForm";
import BudgetSummary from "./components/BudgetSummary";

const App = () => {
  const [budgets, setBudgets] = useState([]);

  const addBudget = (budget) => {
    setBudgets([...budgets, budget]);
  };

  return (
    <div className="app-container">
      <h1>Budget Planner</h1>
      <BudgetForm addBudget={addBudget} />
      <BudgetSummary budgets={budgets} />
    </div>
  );
};

export default App;
