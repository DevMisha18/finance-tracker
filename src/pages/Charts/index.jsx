import { useState } from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";

export default function Charts() {
  const [selectedChart, setSelectedChart] = useState("PieChart");

  return (
    <div>
      <label htmlFor="charts" className="sr-only">
        Select Chart Type
      </label>{" "}
      <select
        name="charts"
        id="charts"
        className="block w-full mb-4 rounded-md border border-gray-300 bg-white py-2 px-3 pr-10 text-left text-sm font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        value={selectedChart}
        onChange={(e) => setSelectedChart(e.target.value)}
      >
        <option value="PieChart">Pie Chart</option>
        <option value="BarChart">Bar Chart</option>
      </select>
      {selectedChart === "PieChart" ? <PieChart /> : <BarChart />}
    </div>
  );
}
