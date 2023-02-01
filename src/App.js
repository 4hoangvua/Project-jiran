import React, { Fragment } from "react";
import "antd/dist/antd.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
import ErrorBoundary from "~/components/ErrorBoundary/ErrorBoundary";
import AdminTemplate from "~/templates/AdminTemplate";
function App() {
  return (
    <>
      <ErrorBoundary>
        <Router>
          <Routes>
            {publicRoutes.map((route, index) => {
              let Layout = AdminTemplate;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </ErrorBoundary>
    </>
  );
}

export default App;
