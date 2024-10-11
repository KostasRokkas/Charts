import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { downloadPdf } from "../../common/downloadPdf";
import classes from "./pie.module.css";

/**
 * PieChart component renders a responsive pie chart using ECharts.
 * It adjusts based on the window size and allows users to download the chart as a PDF.
 */
const PieChart = () => {
  const chartRef = useRef(null); // Reference to the chart DOM element
  const [windowSize, setWindowSize] = useState(window.innerWidth); // State to track the window size

  /**
   * Returns the chart options based on the current window width.
   * This allows for responsive behavior such as adjusting label font size.
   *
   * @param {number} width - The current width of the window.
   * @returns {object} - ECharts options for the pie chart.
   */
  const getChartOptions = (width) => {
    const isMobile = width < 768;
    const labelFontSize = isMobile ? 10 : 14;

    return {
      title: {
        text: "Basic Pie Chart",
        top: "5%",
        left: "center",
        textStyle: {
          fontWeight: "bold",
          fontSize: windowSize >= 1024 ? 16 : 12,
        },
      },
      tooltip: {
        trigger: "item", // Tooltip triggers when hovering over pie items
      },
      legend: {
        orient: "vertical", // Arrange legend items vertically
        left: "left", // Align legend to the left
        bottom: "0%", // Position the legend at the bottom
        textStyle: {
          fontSize: labelFontSize, // Set font size for legend items
        },
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"], // Inner and outer radius of the pie chart
          center: ["50%", "50%"], // Keep the pie chart centered
          avoidLabelOverlap: false, // Prevent label overlap
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true, // Show label when item is emphasized (hovered)
              fontSize: labelFontSize, // Font size for emphasized label
              fontWeight: "bold", // Font weight for emphasized label
            },
          },
          labelLine: {
            show: false, // Do not show the connecting line to the labels
          },
          data: [
            { value: 1048, name: "Search Engine" }, // Data for the pie chart
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    };
  };

  /**
   * Creates an ECharts instance and sets its options.
   *
   * @param {number} width - The current width of the window.
   * @returns {object} - The ECharts instance.
   */
  const createChartInstance = (width) => {
    const chartInstance = echarts.init(chartRef.current); // Initialize ECharts instance
    const options = getChartOptions(width); // Get chart options based on window size
    chartInstance.setOption(options); // Set options for the chart
    return chartInstance;
  };

  /**
   * Updates the window size state when the window is resized.
   */
  const handleResize = () => setWindowSize(window.innerWidth); // Update state with new window width

  useEffect(() => {
    const chartInstance = createChartInstance(windowSize); // Create chart on component mount
    window.addEventListener("resize", handleResize); // Listen for window resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup event listener on unmount
      chartInstance.dispose(); // Dispose of the ECharts instance
    };
  }, [windowSize]); // Only run once on mount

  useEffect(() => {
    const existingChart = echarts.getInstanceByDom(chartRef.current); // Get existing ECharts instance
    if (existingChart) {
      existingChart.setOption(getChartOptions(windowSize)); // Update chart options on window resize
      existingChart.resize(); // Resize the chart
    }
  }, [windowSize]);
  return (
    <div id="PieChart" className={classes.PieChart}>
      <div
        ref={chartRef} // Reference for the ECharts instance
        className={classes.chart}
        style={{ width: "100%", height: "400px" }}
      />
      <button
        className={classes.downloadButton}
        onClick={() => downloadPdf("PieChart")}
      >
        Download PDF
      </button>
    </div>
  );
};

export default PieChart;
