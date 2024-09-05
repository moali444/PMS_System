import { useState, useRef } from "react";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import "chart.js/auto"; // ADD THIS
ChartJS.register(Tooltip, Legend, ArcElement);
interface TaskCountType {
  taskCount: {
    toDo: number;
    inProgress: number;
    done: number;
  };
}

export const PieChart = ({ taskCount }: TaskCountType): JSX.Element => {
  const pieData = {
    labels: ["ToDo", "in Progress", "Done"],
    datasets: [
      {
        label: "My First Dataset",
        data: [taskCount?.toDo, taskCount?.inProgress, taskCount?.done],
        backgroundColor: ["rgb(255, 99, 132)", "#fd7e14", "#28a745"],
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const label = pieData.labels[tooltipItem.dataIndex];
            const value = pieData.datasets[0].data[tooltipItem.dataIndex];
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return <Pie data={pieData} options={options} />;
};
