import React, { useState } from "react";
import PieChart from "./PieChart";
import home from "../assets/home.png";
import income from "../assets/income.png";
import insurance from "../assets/insurance.png";
import groceries from "../assets/grocery.png";
import medical from "../assets/medical.png";
import entertainment from "../assets/ticket.png";
import children from "../assets/children.png";
import arrowUp from "../assets/up-chevron.png";
import arrowDown from "../assets/down-chevron.png";

const BudgetSummary = ({ budgets, formattedAmount }) => {
  const categories = [
    { value: "income", label: "Income", icon: income },
    { value: "home", label: "Home", icon: home },
    {
      value: "insurance",
      label: "Insurance",
      icon: insurance,
    },
    { value: "groceries", label: "Groceries", icon: groceries },
    { value: "medical", label: "Medical", icon: medical },
    { value: "entertainment", label: "Entertainment", icon: entertainment },
    { value: "children", label: "Children", icon: children },
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

  const convertAmountByFrequency = (
    amount,
    originalFrequency,
    targetFrequency
  ) => {
    const frequencyMapping = {
      weekly: {
        monthly: amount * 4,
        annually: amount * 52,
      },
      monthly: {
        weekly: amount / 4,
        annually: amount * 12,
      },
      annually: {
        weekly: amount / 52,
        monthly: amount / 12,
      },
    };

    return frequencyMapping[originalFrequency][targetFrequency] || amount;
  };

  const getTotalByFrequency = (frequency) => {
    const totalIncome = budgets
      .filter((budget) => budget.category === "income")
      .reduce((total, budget) => {
        const convertedAmount = convertAmountByFrequency(
          budget.amount,
          budget.frequency,
          frequency
        );
        return total + convertedAmount;
      }, 0);

    const totalExpenses = budgets
      .filter((budget) => budget.category !== "income")
      .reduce((total, budget) => {
        const convertedAmount = convertAmountByFrequency(
          budget.amount,
          budget.frequency,
          frequency
        );
        return total + Math.abs(convertedAmount);
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
                <div>
                  <img
                    src={category.icon}
                    alt={`${category.label} icon`}
                    className="category-icon"
                  />
                  <span className="category-label">{category.label}</span>
                </div>
                <span className="total-amount">
                  ${formattedAmount(total)}
                  <span className="down-arrow">
                    {selectedCategories.includes(category.value) ? (
                      <img src={arrowUp} alt="Expand" className="arrow-icon" />
                    ) : (
                      <img
                        src={arrowDown}
                        alt="Collapse"
                        className="arrow-icon"
                      />
                    )}
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
                          ${formattedAmount(budget.amount)} ({budget.frequency})
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
              className="summary-frequency-button"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="annually">Annually</option>
            </select>
          </span>

          <span className="total-amount">
            ${formattedAmount(getTotalByFrequency(summaryFrequency))}
          </span>
        </div>
      </div>
      {budgets.length >= 2 && (
        <PieChart budgets={budgets} frequency={summaryFrequency} />
      )}
    </div>
  );
};

export default BudgetSummary;
