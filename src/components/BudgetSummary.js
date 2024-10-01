import React, { useState } from "react";

const BudgetSummary = ({ budgets }) => {
  const categories = [
    { value: "income", label: "Income" },
    { value: "home & utilities", label: "Home & Utilities" },
    { value: "insurance & financial", label: "Insurance & Financial" },
    { value: "groceries", label: "Groceries" },
    { value: "personal & medical", label: "Personal & Medical" },
    { value: "entertainment & eat-out", label: "Entertainment & Eat-Out" },
    { value: "children", label: "Children" },
  ];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [summaryFrequency, setSummaryFrequency] = useState("annually");

  const handleCategoryClick = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const getTotalByCategory = (category) => {
    return budgets
      .filter((budget) => budget.category === category)
      .reduce((total, budget) => total + budget.amount, 0);
  };

  const getTotalByFrequency = (frequency) => {
    const multiplier =
      frequency === "weekly"
        ? 1
        : frequency === "monthly"
        ? 4
        : frequency === "annually"
        ? 52
        : 0;

    const totalIncome = budgets
      .filter((budget) => budget.category === "income")
      .reduce((total, budget) => {
        const amountWithMultiplier = budget.amount * multiplier;
        return total + amountWithMultiplier;
      }, 0);

    const totalExpenses = budgets
      .filter((budget) => budget.category !== "income")
      .reduce((total, budget) => {
        const amountWithMultiplier = Math.abs(budget.amount * multiplier);
        return total + amountWithMultiplier;
      }, 0);

    return totalIncome - totalExpenses;
  };

  return (
    <div className="budget-summary">
      {categories.map((category) => {
        const total = getTotalByCategory(category.value);
        const filteredBudgets = budgets.filter(
          (budget) => budget.category === category.value
        );

        return (
          <div key={category.value}>
            <button
              onClick={() => handleCategoryClick(category.value)}
              className={`category-button ${
                selectedCategories.includes(category.value) ? "active" : ""
              }`}
            >
              <div className="category-info">
                <span className="category-label">{category.label}</span>
                <span className="total-amount">
                  ${total.toFixed(2)}
                  <span className="down-arrow">
                    {selectedCategories.includes(category.value) ? " ▲" : " ▼"}
                  </span>
                </span>
              </div>
            </button>
            {selectedCategories.includes(category.value) && (
              <div className="expense-details">
                <ul>
                  {filteredBudgets.map((budget, index) => (
                    <li className="expenses" key={index}>
                      <div className="expense-info">
                        <span className="expense-description">
                          {budget.description}
                        </span>
                        <span className="expense-amount">
                          ${budget.amount.toFixed(2)} ({budget.frequency})
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
      <div className="summary-section">
        <div className="summary-button">
          <span className="category-label">
            Summary{" "}
            <select
              value={summaryFrequency}
              onChange={(e) => setSummaryFrequency(e.target.value)}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="annually">Annually</option>
            </select>
          </span>

          <span className="total-amount">
            ${getTotalByFrequency(summaryFrequency).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;
