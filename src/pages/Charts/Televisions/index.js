import React, { useState } from "react";
import PieChart from "../../../components/PieChart ";
import classes from "./index.module.css";

const Televisions = () => {
  // Data for product categories
  const productCategoryData = [
    { name: "OLED", pieces: 300, total: 30000 },
    { name: "LCD", pieces: 500, total: 25000 },
    { name: "Plasma", pieces: 150, total: 22500 },
    { name: "LED", pieces: 400, total: 28000 },
  ];

  // Data for regions
  const regionData = [
    { name: "Europe", pieces: 600, total: 45000 },
    { name: "North America", pieces: 400, total: 35000 },
    { name: "Asia", pieces: 700, total: 50000 },
    { name: "South America", pieces: 200, total: 10000 },
  ];

  // Data for sales by year
  const salesByYearData = [
    { name: "2021", pieces: 500, total: 40000 },
    { name: "2022", pieces: 700, total: 60000 },
    { name: "2023", pieces: 800, total: 70000 },
  ];

  // Data for sales by brand
  const salesByBrandData = [
    { name: "Samsung", pieces: 400, total: 50000 },
    { name: "LG", pieces: 300, total: 35000 },
    { name: "Sony", pieces: 200, total: 30000 },
    { name: "TCL", pieces: 150, total: 20000 },
  ];

  // Data for sales by type
  const salesByTypeData = [
    { name: "Smart TV", pieces: 900, total: 75000 },
    { name: "Non-Smart TV", pieces: 300, total: 25000 },
  ];

  // State for selected filters
  const [selectedProduct, setSelectedProduct] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");

  // Function to handle product category filter change
  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  // Function to handle region filter change
  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  // Filter data based on selected filters
  const filteredProductData =
    selectedProduct === "All"
      ? productCategoryData
      : productCategoryData.filter((item) => item.name === selectedProduct);

  const filteredRegionData =
    selectedRegion === "All"
      ? regionData
      : regionData.filter((item) => item.name === selectedRegion);

  return (
    <div className={classes.Televisions}>
      <h2>Television Sales Overview</h2>

      <div className={classes.filters}>
        <div className={classes.filterGroup}>
          <label htmlFor="productFilter">Select Product Category:</label>
          <select
            id="productFilter"
            value={selectedProduct}
            onChange={handleProductChange}
          >
            <option value="All">All</option>
            {productCategoryData.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className={classes.filterGroup}>
          <label htmlFor="regionFilter">Select Region:</label>
          <select
            id="regionFilter"
            value={selectedRegion}
            onChange={handleRegionChange}
          >
            <option value="All">All</option>
            {regionData.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={classes.chartContainer}>
        <div className={classes.chart}>
          <h3>Television Sales by Product Category</h3>
          <PieChart
            data={filteredProductData}
            title="Television Sales by Product Category"
          />
        </div>
        <div className={classes.chart}>
          <h3>Television Sales by Region</h3>
          <PieChart
            data={filteredRegionData}
            title="Television Sales by Region"
          />
        </div>
        <div className={classes.chart}>
          <h3>Television Sales by Year</h3>
          <PieChart data={salesByYearData} title="Television Sales by Year" />
        </div>
        <div className={classes.chart}>
          <h3>Television Sales by Brand</h3>
          <PieChart data={salesByBrandData} title="Television Sales by Brand" />
        </div>
        <div className={classes.chart}>
          <h3>Television Sales by Type</h3>
          <PieChart data={salesByTypeData} title="Television Sales by Type" />
        </div>
      </div>
    </div>
  );
};

export default Televisions;
