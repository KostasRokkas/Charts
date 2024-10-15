import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import classes from "./index.module.css";
import PropTypes from "prop-types";

const BarChart = ({ title, data, barColor }) => {
  const chartRef = useRef(null);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  // Get chart options based on window size
  const getChartOptions = (width) => {
    const isMobile = width < 768;
    const barWidth = isMobile ? 5 : 20;
    const labelRotation = isMobile ? 45 : 0;

    return {
      title: {
        text: title,
        top: "0%",
        left: "center",
        textStyle: {
          fontWeight: "bold",
          // fontSize: windowSize >= 1024 ? 25 : 25,
          fontSize: windowSize > 1146 ? "25" : windowSize < 768 ? "10" : "15",
        },
      },
      tooltip: {
        trigger: "axis",
        position: (pt) => [pt[0], "10%"],
      },
      xAxis: {
        type: "category",
        data: data.categories,
        axisLabel: {
          rotate: labelRotation,
        },
      },
      yAxis: {
        type: "value",
      },
      grid: {
        bottom: "10%",
        containLabel: true,
      },
      series: [
        {
          name: "Sales",
          type: "bar",
          data: data.values,
          itemStyle: {
            color: barColor || "#4CAF50",
          },
          barWidth: barWidth,
        },
      ],
    };
  };

  const createChartInstance = (width) => {
    const chartInstance = echarts.init(chartRef.current);
    const options = getChartOptions(width);
    chartInstance.setOption(options);
    return chartInstance;
  };

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
    <div id="BarChart" className={classes.BarChart}>
      <div
        ref={chartRef}
        className={classes.chart}
        style={{
          // width: "100%",
          // height: "100%",
          width:
            windowSize > 1056 ? "500px" : windowSize < 768 ? "200px" : "300px",
          height: windowSize >= 768 ? "200px" : "200px",
        }}
      />
    </div>
  );
};

BarChart.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  barColor: PropTypes.string,
};

export default BarChart;
