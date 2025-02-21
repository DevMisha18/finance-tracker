import { useDb } from "../../context/DbContext";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function PieChart() {
  const { transactions } = useDb();
  const svgRef = useRef();

  useEffect(() => {
    if (!transactions || transactions.length === 0) return;

    // Set up data for d3 charts
    const typeTotals = new Map();
    for (const transaction of transactions) {
      const { type, money } = transaction;
      if (type !== "salary")
        typeTotals.set(type, (typeTotals.get(type) ?? 0) + Math.abs(money));
    }
    const data = [];
    for (const [type, money] of typeTotals) {
      data.push({ type, money });
    }

    // Reset the SVG
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up SVG container with larger dimensions
    const w = 200; // Increased width
    const h = 200; // Increased height
    const radius = Math.min(w, h) / 2;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w + 150)
      .attr("height", h);

    // Create a group for the pie chart and center it
    const g = svg
      .selectAll("g")
      .data([null])
      .join("g")
      .attr("transform", `translate(${w / 2},${h / 2})`);

    // Set up chart
    const formattedData = d3.pie().value((d) => d.money)(data);
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
    const color = d3.scaleOrdinal().range(d3.schemeSet2);

    // Draw pie slices
    g.selectAll("path")
      .data(formattedData)
      .join("path")
      .attr("d", arcGenerator)
      .attr("fill", (d) => color(d.data.type));

    // Create Legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${w + 20}, 30)`);

    const legendItems = legend
      .selectAll(".legend-item")
      .data(formattedData)
      .join("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 22})`);

    // Add colored squares to legend
    legendItems
      .append("rect")
      .attr("width", 18) // Increased size of legend boxes
      .attr("height", 18)
      .attr("fill", (d) => color(d.data.type));

    // Add text labels to legend
    legendItems
      .append("text")
      .attr("x", 30) // Adjusted position for larger boxes
      .attr("y", 12)
      .attr("dy", "0.35em")
      .style("font-size", "14px") // Increased font size
      .text((d) => d.data.type);
  }, [transactions]);

  return (
    <>
      <svg ref={svgRef}></svg>
    </>
  );
}
