import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import Login from "./Login";
import Dashboard from "./Dashboard";
import IntentForm from "./IntentForm"; 

function App() {
  return React.createElement(
    BrowserRouter,
    null,

    React.createElement(
      Routes,
      null,

      React.createElement(Route, {
        path: "/",
        element: React.createElement(LandingPage),
      }),

      React.createElement(Route, {
        path: "/login",
        element: React.createElement(Login),
      }),

      React.createElement(Route, {
        path: "/dashboard",
        element: React.createElement(Dashboard),
      }),

      React.createElement(Route, {
        path: "/intent-form",
        element: React.createElement(IntentForm), 
      }),
    ),
  );
}

export default App;
