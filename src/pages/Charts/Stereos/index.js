import React, { useState } from "react";
import BarChart from "../../../components/BarChart";
import { downloadPdf } from "../../../common/downloadPdf";
import classes from "./index.module.css";

const salesData = {
  EUR: {
    month1: [
      { name: "Kostas", value: 120 },
      { name: "George", value: 200 },
      { name: "Anna", value: 150 },
      { name: "Lina", value: 80 },
      { name: "Mika", value: 70 },
      { name: "Omar", value: 110 },
      { name: "Nina", value: 130 },
    ],
    month2: [
      { name: "Kostas", value: 90 },
      { name: "George", value: 140 },
      { name: "Anna", value: 200 },
      { name: "Lina", value: 100 },
      { name: "Mika", value: 80 },
      { name: "Omar", value: 130 },
      { name: "Nina", value: 160 },
    ],
    month3: [
      { name: "Kostas", value: 110 },
      { name: "George", value: 180 },
      { name: "Anna", value: 170 },
      { name: "Lina", value: 90 },
      { name: "Mika", value: 60 },
      { name: "Omar", value: 120 },
      { name: "Nina", value: 140 },
    ],
    month4: [
      { name: "Kostas", value: 130 },
      { name: "George", value: 190 },
      { name: "Anna", value: 160 },
      { name: "Lina", value: 100 },
      { name: "Mika", value: 70 },
      { name: "Omar", value: 140 },
      { name: "Nina", value: 150 },
    ],
    month5: [
      { name: "Kostas", value: 140 },
      { name: "George", value: 210 },
      { name: "Anna", value: 180 },
      { name: "Lina", value: 110 },
      { name: "Mika", value: 80 },
      { name: "Omar", value: 150 },
      { name: "Nina", value: 170 },
    ],
  },
  USD: {
    month1: [
      { name: "Kostas", value: 100 },
      { name: "George", value: 180 },
      { name: "Anna", value: 130 },
      { name: "Lina", value: 90 },
      { name: "Mika", value: 60 },
      { name: "Omar", value: 120 },
      { name: "Nina", value: 110 },
    ],
    month2: [
      { name: "Kostas", value: 80 },
      { name: "George", value: 120 },
      { name: "Anna", value: 190 },
      { name: "Lina", value: 110 },
      { name: "Mika", value: 70 },
      { name: "Omar", value: 140 },
      { name: "Nina", value: 150 },
    ],
    month3: [
      { name: "Kostas", value: 90 },
      { name: "George", value: 150 },
      { name: "Anna", value: 170 },
      { name: "Lina", value: 100 },
      { name: "Mika", value: 65 },
      { name: "Omar", value: 130 },
      { name: "Nina", value: 160 },
    ],
    month4: [
      { name: "Kostas", value: 100 },
      { name: "George", value: 170 },
      { name: "Anna", value: 200 },
      { name: "Lina", value: 120 },
      { name: "Mika", value: 75 },
      { name: "Omar", value: 150 },
      { name: "Nina", value: 180 },
    ],
    month5: [
      { name: "Kostas", value: 110 },
      { name: "George", value: 180 },
      { name: "Anna", value: 210 },
      { name: "Lina", value: 130 },
      { name: "Mika", value: 80 },
      { name: "Omar", value: 160 },
      { name: "Nina", value: 190 },
    ],
  },
  CHF: {
    month1: [
      { name: "Kostas", value: 110 },
      { name: "George", value: 170 },
      { name: "Anna", value: 140 },
      { name: "Lina", value: 95 },
      { name: "Mika", value: 65 },
      { name: "Omar", value: 115 },
      { name: "Nina", value: 120 },
    ],
    month2: [
      { name: "Kostas", value: 85 },
      { name: "George", value: 130 },
      { name: "Anna", value: 180 },
      { name: "Lina", value: 105 },
      { name: "Mika", value: 75 },
      { name: "Omar", value: 135 },
      { name: "Nina", value: 155 },
    ],
    month3: [
      { name: "Kostas", value: 90 },
      { name: "George", value: 150 },
      { name: "Anna", value: 160 },
      { name: "Lina", value: 100 },
      { name: "Mika", value: 80 },
      { name: "Omar", value: 140 },
      { name: "Nina", value: 165 },
    ],
    month4: [
      { name: "Kostas", value: 95 },
      { name: "George", value: 160 },
      { name: "Anna", value: 170 },
      { name: "Lina", value: 110 },
      { name: "Mika", value: 85 },
      { name: "Omar", value: 150 },
      { name: "Nina", value: 175 },
    ],
    month5: [
      { name: "Kostas", value: 100 },
      { name: "George", value: 170 },
      { name: "Anna", value: 180 },
      { name: "Lina", value: 115 },
      { name: "Mika", value: 90 },
      { name: "Omar", value: 155 },
      { name: "Nina", value: 180 },
    ],
  },
  NZD: {
    month1: [
      { name: "Kostas", value: 95 },
      { name: "George", value: 155 },
      { name: "Anna", value: 135 },
      { name: "Lina", value: 85 },
      { name: "Mika", value: 55 },
      { name: "Omar", value: 105 },
      { name: "Nina", value: 125 },
    ],
    month2: [
      { name: "Kostas", value: 75 },
      { name: "George", value: 115 },
      { name: "Anna", value: 165 },
      { name: "Lina", value: 90 },
      { name: "Mika", value: 70 },
      { name: "Omar", value: 130 },
      { name: "Nina", value: 150 },
    ],
    month3: [
      { name: "Kostas", value: 80 },
      { name: "George", value: 140 },
      { name: "Anna", value: 150 },
      { name: "Lina", value: 95 },
      { name: "Mika", value: 75 },
      { name: "Omar", value: 135 },
      { name: "Nina", value: 155 },
    ],
    month4: [
      { name: "Kostas", value: 90 },
      { name: "George", value: 150 },
      { name: "Anna", value: 160 },
      { name: "Lina", value: 100 },
      { name: "Mika", value: 80 },
      { name: "Omar", value: 140 },
      { name: "Nina", value: 160 },
    ],
    month5: [
      { name: "Kostas", value: 100 },
      { name: "George", value: 160 },
      { name: "Anna", value: 170 },
      { name: "Lina", value: 105 },
      { name: "Mika", value: 85 },
      { name: "Omar", value: 150 },
      { name: "Nina", value: 170 },
    ],
  },
};

/**
 * Stereos component displays stereo sales data across multiple currencies and months.
 * It provides a filtering option to select a salesperson and allows users to download
 * the sales data as a PDF.
 */
const Stereos = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
  const [selectedName, setSelectedName] = useState("");

  /**
   * Extract unique salesperson names from the sales data across all currencies.
   * This ensures that the filter by name dropdown contains all available names.
   */
  const uniqueNames = Array.from(
    new Set(
      Object.values(salesData).flatMap((currency) =>
        currency.month1.map((sale) => sale.name)
      )
    )
  );

  /**
   * Handles the downloading of charts as a PDF document by calling the downloadPdf utility function.
   */
  const handleDownload = () => {
    downloadPdf("Stereos");
  };

  /**
   * Filters the sales data based on the selected salesperson's name.
   *
   * @param data - The array of sales data to filter.
   * @param name - The name of the salesperson to filter by.
   * @returns Filtered array of sales data for the selected name.
   */
  const filterDataByName = (data, name) => {
    return data.filter((sale) => sale.name === name);
  };

  // Filtering the sales data for each month based on the selected salesperson's name.
  const month1Data = selectedName
    ? filterDataByName(salesData[selectedCurrency].month1, selectedName)
    : salesData[selectedCurrency].month1;
  const month2Data = selectedName
    ? filterDataByName(salesData[selectedCurrency].month2, selectedName)
    : salesData[selectedCurrency].month2;
  const month3Data = selectedName
    ? filterDataByName(salesData[selectedCurrency].month3, selectedName)
    : salesData[selectedCurrency].month3;
  const month4Data = selectedName
    ? filterDataByName(salesData[selectedCurrency].month4, selectedName)
    : salesData[selectedCurrency].month4;
  const month5Data = selectedName
    ? filterDataByName(salesData[selectedCurrency].month5, selectedName)
    : salesData[selectedCurrency].month5;

  return (
    <div id="Stereos" className={classes.Stereos}>
      {/* Filters for selecting a salesperson and downloading charts */}
      <div className={classes.filters}>
        <div className={classes.inputGroup}>
          <label>Filter by Name</label>
          <select
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
          >
            <option value="">All</option>
            {uniqueNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.downloadContainer}>
          <button onClick={handleDownload} className={classes.downloadButton}>
            Download Charts
          </button>
        </div>
      </div>

      {/* Buttons to switch between different currencies */}
      <div className={classes.buttons}>
        {Object.keys(salesData).map((currency) => (
          <div className={classes.button}>
            <button
              key={currency}
              className={
                selectedCurrency === currency
                  ? classes.checkedButton
                  : classes.uncheckedButton
              }
              onClick={() => {
                setSelectedCurrency(currency);
              }}
            >
              {currency}
            </button>
          </div>
        ))}
      </div>

      {/* Charts displaying sales data for the selected salesperson/currency/month */}
      <div id="chartsContainer" className={classes.chartsContainer}>
        {/* Month 1 sales data */}
        <div className={classes.chart}>
          <h3>Sales Data for {selectedName || "All"} - Month 1</h3>
          <BarChart
            title={`Stereo Sales - Month 1 (${selectedCurrency})`}
            data={{
              categories: month1Data.map((sale) => sale.name),
              values: month1Data.map((sale) => sale.value),
            }}
            barColor={"#FF6347"}
          />
        </div>

        {/* Month 2 sales data */}
        <div className={classes.chart}>
          <h3>Sales Data for {selectedName || "All"} - Month 2</h3>
          <BarChart
            title={`Stereo Sales - Month 2 (${selectedCurrency})`}
            data={{
              categories: month2Data.map((sale) => sale.name),
              values: month2Data.map((sale) => sale.value),
            }}
            barColor={"#4682B4"}
          />
        </div>

        {/* Month 3 sales data */}
        <div className={classes.chart}>
          <h3>Sales Data for {selectedName || "All"} - Month 3</h3>
          <BarChart
            title={`Stereo Sales - Month 3 (${selectedCurrency})`}
            data={{
              categories: month3Data.map((sale) => sale.name),
              values: month3Data.map((sale) => sale.value),
            }}
            barColor={"#4682B4"}
          />
        </div>

        {/* Month 4 sales data */}
        <div className={classes.chart}>
          <h3>Sales Data for {selectedName || "All"} - Month 4</h3>
          <BarChart
            title={`Stereo Sales - Month 4 (${selectedCurrency})`}
            data={{
              categories: month4Data.map((sale) => sale.name),
              values: month4Data.map((sale) => sale.value),
            }}
            barColor={"#4682B4"}
          />
        </div>

        {/* Month 5 sales data */}
        <div className={classes.chart}>
          <h3>Sales Data for {selectedName || "All"} - Month 5</h3>
          <BarChart
            title={`Stereo Sales - Month 5 (${selectedCurrency})`}
            data={{
              categories: month5Data.map((sale) => sale.name),
              values: month5Data.map((sale) => sale.value),
            }}
            barColor={"#4682B4"}
          />
        </div>
      </div>
    </div>
  );
};

export default Stereos;
