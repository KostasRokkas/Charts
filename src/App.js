import _ from "lodash";
import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Stereos from "./pages/Charts/Stereos/index.js";
import Charts from "./pages/Charts/index.js";
import Navbar from "./components/Navbar/index.js";
import classes from "./App.module.css";
import Televisions from "./pages/Charts/Televisions/index.js";

export function links() {
  return [
    {
      title: "Charts",
      id: "Charts",
      path: "/charts",
      element: <Charts />,
      inMenu: true,
      links: [
        {
          title: "Stereos",
          id: "Stereos",
          path: "/stereos",
          element: <Stereos />,
          inMenu: true,
        },
        {
          title: "Televisions",
          id: "Televisions",
          path: "/televisions",
          element: <Televisions />,
          inMenu: true,
        },
      ],
    },
  ];
}

const App = () => {
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <div className={classes.navbar}>
          <Navbar />
        </div>
        <div className={classes.mainContainer}>
          <Routes>
            {links().map((link, idx) => {
              const subLinks = _.get(link, "links", []);
              const hasSubLinks = subLinks.length > 0;
              return (
                <React.Fragment key={idx}>
                  <Route key={idx} path={link.path} element={link.element} />
                  {hasSubLinks &&
                    subLinks.map((subLink, sidx) => (
                      <React.Fragment key={sidx}>
                        <Route
                          key={sidx}
                          path={`${link.path}${subLink.path}`}
                          element={subLink.element}
                        />
                      </React.Fragment>
                    ))}
                </React.Fragment>
              );
            })}
          </Routes>
        </div>
      </div>
      {/* <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} /> */}
      <ToastContainer />
    </BrowserRouter>
    // </QueryClientProvider>
  );
};

export default App;
