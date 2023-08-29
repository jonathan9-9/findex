import React, { useState, useEffect } from "react";

const DATA_COUNT = 5;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

const data = {
  labels: ["Red", "Orange", "Yellow", "Green", "Blue"],
  datasets: [
    {
      label: "Dataset 1",
      data: Utils.numbers(NUMBER_CFG),
      backgroundColor: Object.values(Utils.CHART_COLORS),
    },
  ],
};

const config = {
  type: "doughnut",
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Doughnut Chart",
      },
    },
  },
};

const actions = [
  {
    name: "Randomize",
    handler(chart) {
    },
  },
  {
    name: "Add Dataset",
    handler(chart) {
    },
  },

];

const ctx = document.getElementById("myChart");
const myChart = new Chart(ctx, config);

actions.forEach((a) => {
  button.onclick = () => a.handler(myChart);
});
