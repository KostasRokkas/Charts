import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import classes from "./index.module.css";
import { downloadPdf } from "../../common/downloadPdf";

const TimelineChart = () => {
  const chartRef = useRef(null); // Reference for the chart DOM element
  const [windowSize, setWindowSize] = useState(window.innerWidth); // State to track the window size

  /**
   * Returns the chart options based on the current window width.
   * This allows for responsive behavior such as adjusting the line width, zoom, and data visibility.
   *
   * @param {number} width - The current width of the window.
   * @returns {object} - ECharts options for the timeline chart, including zooming and scaling features.
   */
  const getChartOptions = (width) => {
    const isMobile = width < 768; // Check if the window is in mobile size
    const lineWidth = isMobile ? 1 : 2; // Set the line width based on screen size

    return {
      title: {
        text: "Sales Timeline Chart",
        top: "5%",
        left: "center",
        textStyle: {
          fontWeight: "bold",
          fontSize: windowSize >= 1024 ? 16 : 12, // Adjust font size based on screen size
        },
      },
      tooltip: {
        trigger: "axis", // Show tooltip when hovering over axes
      },
      xAxis: {
        type: "category",
        boundaryGap: false, // No gap between the x-axis and data points
        data: [
          "2000",
          "2001",
          "2002",
          "2003",
          "2004",
          "2005",
          "2006",
          "2007",
          "2008",
          "2009",
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Sales",
          type: "line",
          data: [
            120, 150, 180, 200, 220, 230, 210, 240, 260, 270, 150, 230, 224,
            218, 135, 147, 260, 310, 400, 390, 420, 450, 480, 510, 530,
          ],
          lineStyle: {
            width: lineWidth, // Adjust line width based on screen size
          },
        },
      ],
      dataZoom: [
        {
          type: "slider", // Slider at the bottom of the chart for zoom control
          start: 50, // Initial view starts from the middle
          end: 100, // Initially shows the last half of the timeline
        },
        {
          type: "inside",
          start: 50,
          end: 100,
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
    const chartInstance = echarts.init(chartRef.current); // Initialize the chart on the referenced DOM element
    const options = getChartOptions(width); // Get the chart options based on the current width
    chartInstance.setOption(options); // Set the chart options
    return chartInstance;
  };

  /**
   * Updates the window size state when the window is resized.
   */
  const handleResize = () => setWindowSize(window.innerWidth);

  useEffect(() => {
    const chartInstance = createChartInstance(windowSize); // Create the chart instance on mount
    window.addEventListener("resize", handleResize); // Add event listener for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener on component unmount
      chartInstance.dispose(); // Dispose of the chart instance on unmount
    };
  }, [windowSize]);

  useEffect(() => {
    const existingChart = echarts.getInstanceByDom(chartRef.current); // Get the existing chart instance
    if (existingChart) {
      existingChart.setOption(getChartOptions(windowSize)); // Update the chart options with the new size
      existingChart.resize(); // Resize the chart to fit the new window size
    }
  }, [windowSize]);

  return (
    <div id="TimelineChart" className={classes.TimelineChart}>
      <div
        ref={chartRef} // Reference to the chart container
        className={classes.container}
        style={{ width: "100%", height: "400px" }}
      />
      <button
        className={classes.downloadButton}
        onClick={() => downloadPdf("TimelineChart")}
      >
        Download PDF
      </button>
    </div>
  );
};

export default TimelineChart;
