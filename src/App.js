import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { publicRoutes } from "~/routes";
import { DefaultLayout } from "~/components/Layout";
import { Fragment, Suspense } from "react";
import GlobalStyled from "./GlobalStyles";
import React from "react";
import "antd/dist/antd.min.css";
import { ErrorBoundary } from "~/components/ErrorBoundary";
import { Loading } from "~/components/Layout/Loading";
function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Router>
          <Routes>
            {publicRoutes.map((route, index) => {
              let Layout = DefaultLayout;
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
          <GlobalStyled />
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
