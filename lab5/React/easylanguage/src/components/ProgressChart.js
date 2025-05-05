// ProgressChart.js
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ProgressChart = ({ progress }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const languages = ["english", "german", "polish", "ukrainian"];
    const labels = ["Англійська", "Німецька", "Польська", "Українська"];
    const data = languages.map(lang =>
      progress[lang] ? Object.keys(progress[lang]).length : 0
    );

    if (chartInstance.current) {
      chartInstance.current.data.datasets[0].data = data;
      chartInstance.current.update();
    } else if (chartRef.current) {
      chartInstance.current = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels,
          datasets: [{
            label: "Пройдені уроки",
            data,
            backgroundColor: ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0"],
            borderColor: "#000",
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }

    return () => {
      chartInstance.current?.destroy(); // знищити старий інстанс при розмонтуванні
      chartInstance.current = null;
    };
  }, [progress]);

  return <canvas ref={chartRef}></canvas>;
};

export default ProgressChart;
