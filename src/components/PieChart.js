import React from "react";
import { Chart } from "react-google-charts";

const PieChart = ({ budgets, frequency }) => {
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
  const totalIncome = budgets
    .filter((budget) => budget.category === "income")
    .reduce(
      (acc, budget) =>
        acc +
        convertAmountByFrequency(budget.amount, budget.frequency, frequency),
      0
    );

  const totalExpenses = budgets
    .filter((budget) => budget.category !== "income")
    .reduce(
      (acc, budget) =>
        acc +
        convertAmountByFrequency(
          Math.abs(budget.amount),
          budget.frequency,
          frequency
        ),
      0
    );

  const isSurplus = totalIncome > totalExpenses;

  const data = [
    ["Category", "Amount"],
    ...budgets
      .filter((budget) => budget.category !== "income")
      .reduce((acc, budget) => {
        const found = acc.find(([category]) => category === budget.category);
        const convertedAmount = convertAmountByFrequency(
          Math.abs(budget.amount),
          budget.frequency,
          frequency
        );
        if (found) {
          found[1] += convertedAmount;
        } else {
          acc.push([budget.category, convertedAmount]);
        }
        return acc;
      }, []),
  ];

  const options = {
    is3D: true,
    backgroundColor: "transparent",
    pieStartAngle: 100,
    sliceVisibilityThreshold: 0.02, // Hides slices smaller than 2%
    legend: {
      textStyle: {
        fontSize: 14,
      },
    },
    colors: ["#8AD1C2", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A", "#6C4E31"],
  };

  return (
    <div className="pie-chart-container">
      <h3 className="chart-title">
        {isSurplus
          ? `Your budget is in surplus (Income: $${totalIncome.toLocaleString()} vs Expenses: $${totalExpenses.toLocaleString()})`
          : `Your budget is in deficit (Income: $${totalIncome.toLocaleString()} vs Expenses: $${totalExpenses.toLocaleString()})`}
      </h3>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"300px"}
      />
    </div>
  );
};

export default PieChart;
