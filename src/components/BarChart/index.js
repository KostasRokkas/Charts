import React, { useEffect, useRef, useState } from "react"; // Importing necessary React hooks
import * as echarts from "echarts"; // Importing the echarts library for chart creation
import classes from "./index.module.css"; // Importing CSS module for styling
import { downloadPdf } from "../../common/downloadPdf"; // Importing the PDF download function

/**
 * BarChart component renders a responsive bar chart using ECharts.
 * It dynamically adjusts based on the window size and allows users to download the chart as a PDF.
 */
const BarChart = () => {
  const chartRef = useRef(null); // Reference to the chart DOM element
  const [windowSize, setWindowSize] = useState(window.innerWidth); // State to track the window size

  /**
   * Returns the chart options based on the current window width.
   * This allows for responsive behavior such as adjusting bar width and label rotation.
   *
   * @param {number} width - The current width of the window.
   * @returns {object} - ECharts options for the bar chart.
   */
  const getChartOptions = (width) => {
    const isMobile = width < 768; // Mobile breakpoint for responsive design
    const barWidth = isMobile ? 5 : 20; // Dynamic bar width based on screen size
    const labelRotation = isMobile ? 45 : 0; // Adjust label rotation for better visibility

    return {
      title: {
        text: "Basic Bar Chart",
        top: "5%",
        left: "center",
        textStyle: {
          fontWeight: "bold",
          fontSize: windowSize >= 1024 ? 16 : 12, // Font size based on window size
        },
      },
      tooltip: {
        trigger: "axis", // Tooltip trigger type
        position: function (pt) {
          return [pt[0], "10%"]; // Tooltip position
        },
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisLabel: {
          rotate: labelRotation, // Rotate x-axis labels for mobile view
        },
      },
      yAxis: {
        type: "value",
      },
      grid: {
        bottom: "10%",
        containLabel: true, // Ensures labels are contained within the grid
      },
      series: [
        {
          name: "Sales",
          type: "bar",
          data: [120, 200, 150, 80, 70, 110, 130], // Data for the bar chart
          itemStyle: {
            color: "#4CAF50", // Color of the bars
          },
          barWidth: barWidth, // Width of the bars
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
  }, [windowSize]);

  useEffect(() => {
    const existingChart = echarts.getInstanceByDom(chartRef.current); // Get existing ECharts instance
    if (existingChart) {
      existingChart.setOption(getChartOptions(windowSize)); // Update chart options on window resize
      existingChart.resize(); // Resize the chart
    }
  }, [windowSize]); // Runs whenever windowSize changes

  return (
    <div id="BarChart" className={classes.BarChart}>
      <div
        ref={chartRef} // Reference for the ECharts instance
        className={classes.chart}
        style={{ width: "100%", height: "400px" }}
      />
      <button
        className={classes.downloadButton}
        onClick={() => downloadPdf("BarChart")}
      >
        Download PDF
      </button>
    </div>
  );
};

export default BarChart;
