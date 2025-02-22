import * as d3 from "d3";
import { useRef, useEffect } from "react";
import { useDb } from "../../context/DbContext";

export default function BarChart() {
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

    // Clear SVG before redrawing
    d3.select(svgRef.current).selectAll("*").remove();

    const w = 350;
    const h = 300;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .append("g")
      .attr("transform", "translate(60, 20)");

    // Set up x scale
    const x = d3
      .scaleBand()
      .range([0, w - 100])
      .domain(data.map((d) => d.type))
      .padding(0.2);
    // Add x-axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${h - 80})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Set up y scale
    const maxMoney = d3.max(data, (d) => d.money);
    const y = d3
      .scaleLinear()
      .domain([0, maxMoney])
      .range([h - 80, 0]);
    // Add y-axis
    svg.append("g").call(d3.axisLeft(y));

    // set up color scale
    const color = d3
      .scaleOrdinal()
      .range(d3.schemeSet2)
      .domain(data.map((d) => d.type));

    // Add bars with animation
    svg
      .selectAll("mybar")
      .data(data, (d) => d.type)
      .join("rect")
      .attr("x", (d) => x(d.type))
      .attr("y", h - 80)
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("fill", (d) => color(d.type))
      .transition()
      .duration(800)
      .attr("y", (d) => y(d.money))
      .attr("height", (d) => h - 80 - y(d.money));
  });

  return <svg ref={svgRef}></svg>;
}
