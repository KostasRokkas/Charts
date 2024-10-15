import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import classes from "./pie.module.css";

const PieChart = ({ data, title }) => {
  const chartRef = useRef(null);
  const [windowSize, setWindowSize] = useState(window.innerWidth); // State to track window size

  // Get chart options based on window size
  const getChartOptions = (width) => {
    const isMobile = width < 768;
    const isVerySmallScreen = width < 670; // New condition for very small screens
    const isBigScreen = width < 1200;

    return {
      title: {
        text: title, // Add the title back
        top: "2%", // Position the title at 2% from the top
        left: "center", // Center the title horizontally
        textStyle: {
          fontWeight: "bold",
          fontSize: isMobile ? "15px" : isBigScreen ? "15px" : "25px", // Responsive font size for the title
        },
      },
      tooltip: {
        trigger: "item",
        formatter: (params) => {
          const total = params.data.total; // Accessing the total from the data
          return `${params.seriesName}<br/>${params.name}: ${params.value} pieces<br/>Total: ${total}`;
        },
      },
      legend: {
        orient: "horizontal",
        bottom: "0%", // Positioning legend at the bottom
        left: "center", // Center the legend horizontally
        textStyle: {
          fontSize: isMobile ? "10" : "12", // Responsive font size for legend text
        },
      },
      series: [
        {
          name: "Sales Breakdown",
          type: "pie",
          radius: ["15%", "40%"],
          center: isVerySmallScreen ? ["40%", "50%"] : ["50%", "50%"], // Adjust center based on screen size
          avoidLabelOverlap: false,
          label: {
            show: true,
            formatter: "{b}: {c} pieces", // Show pieces in the label
          },
          emphasis: {
            label: {
              show: true,
              fontSize: isMobile ? 14 : 18,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: true,
          },
          data: data.map((item) => ({
            value: item.pieces,
            name: item.name,
            total: item.total, // Include total in the data passed to ECharts
          })),
        },
      ],
    };
  };

  // Create an ECharts instance and set its options
  const createChartInstance = (width) => {
    const chartInstance = echarts.init(chartRef.current);
    const options = getChartOptions(width);
    chartInstance.setOption(options);
    return chartInstance;
  };

  // Handle window resize
  const handleResize = () => setWindowSize(window.innerWidth);

  useEffect(() => {
    const chartInstance = createChartInstance(windowSize);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.dispose();
    };
  }, [windowSize]);

  useEffect(() => {
    const existingChart = echarts.getInstanceByDom(chartRef.current);
    if (existingChart) {
      existingChart.setOption(getChartOptions(windowSize));
      existingChart.resize();
    }
  }, [data, windowSize]); // Update chart when data changes

  return (
    <div id="PieChart" className={classes.PieChart}>
      <div
        ref={chartRef}
        className={classes.chart}
        style={{
          width:
            windowSize > 1200 ? "500px" : windowSize < 768 ? "500px" : "450px",
          height: windowSize >= 768 ? "300px" : "200px",
        }}
      />
    </div>
  );
};

export default PieChart;
