import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import API from "./api";

import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

function Dashboard() {
  const navigate = useNavigate();

  const [activeYear, setActiveYear] = useState("2026");
  const [applications, setApplications] = useState([]);

  // ================= TOKEN CHECK =================

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, []);

  // ================= FETCH APPLICATIONS =================

  async function fetchApplications() {
    try {
      const res = await API.get("/applications");

      setApplications(res.data);

      console.log("Database Data:", res.data);
    } catch (err) {
      console.log(err);
    }
  }

  // ================= REAL TIME FETCH =================

  useEffect(() => {
    fetchApplications();

    const interval = setInterval(() => {
      fetchApplications();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // ================= DELETE APPLICATION =================

  async function deleteApplication(id) {
    try {
      const response = await API.delete(`/applications/${id}`);

      if (response.data.success) {
        setApplications((prev) => prev.filter((app) => app.id !== id));

        alert("Application Deleted Successfully ✅");
      } else {
        alert("Delete Failed ❌");
      }
    } catch (err) {
      console.log(err);

      alert("Server Error ❌");
    }
  }

  // ================= LIVE STATS =================

  const totalApplications = applications.length;

  const pendingApplications = applications.filter(
    (app) => app.status === "Pending",
  ).length;

  const approvedApplications = applications.filter(
    (app) => app.status === "Approved",
  ).length;

  const rejectedApplications = applications.filter(
    (app) => app.status === "Rejected",
  ).length;

  // ================= MONTHLY LIVE DATA =================

  const monthlyMap = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  applications.forEach((app) => {
    if (app.created_at) {
      const month = new Date(app.created_at).toLocaleString("default", {
        month: "short",
      });

      monthlyMap[month] += 1;
    }
  });

  const months = Object.keys(monthlyMap);

  const monthlyValues = Object.values(monthlyMap);

  // ================= CHART THEME =================

  const CHART_THEME = {
    primary: "#7c3aed",
    secondary: "#06b6d4",
    accent: "#22c55e",
    warning: "#f59e0b",
    danger: "#ef4444",
  };

  // ================= PIE DATA =================

  const pieData = [
    {
      id: 0,
      value: pendingApplications,
      label: "Pending",
      color: CHART_THEME.warning,
    },

    {
      id: 1,
      value: approvedApplications,
      label: "Approved",
      color: CHART_THEME.accent,
    },

    {
      id: 2,
      value: rejectedApplications,
      label: "Rejected",
      color: CHART_THEME.danger,
    },
  ];

  // ================= STAT CARD =================

  function statCard(title, value, sub, cls) {
    return React.createElement(
      "div",
      {
        className: `stat-card ${cls}`,
      },

      React.createElement(
        "div",
        {
          className: "stat-top",
        },

        React.createElement(
          "p",
          {
            className: "stat-title",
          },
          title,
        ),

        React.createElement(
          "span",
          {
            className: "live-badge",
          },
          "LIVE",
        ),
      ),

      React.createElement(
        "h2",
        {
          className: "stat-value",
        },
        value,
      ),

      React.createElement(
        "p",
        {
          className: "stat-sub",
        },
        sub,
      ),
    );
  }

  // ================= UI =================

  return React.createElement(
    "div",
    { className: "dashboard-layout" },

    // ================= SIDEBAR =================

    React.createElement(
      "div",
      { className: "sidebar" },

      React.createElement("h2", { className: "sidebar-logo" }, "CCA Portal"),

      React.createElement(
        "div",
        { className: "menu-list" },

        [
          "Dashboard",
          "Applications",
          "CA Management",
          "ESP Management",
          "DSC Analytics",
          "eSign Analytics",
          "Licensing",
          "Renewals",
          "Audits",
          "Reports",
          "Settings",
        ].map((item) =>
          React.createElement(
            "div",
            {
              key: item,
              className: "menu-item " + (item === "Dashboard" ? "active" : ""),
            },

            item,
          ),
        ),
      ),
    ),

    // ================= MAIN CONTENT =================

    React.createElement(
      "div",
      { className: "dashboard-content" },

      // ================= NAVBAR =================

      React.createElement(
        "div",
        { className: "navbar" },

        React.createElement(
          "div",
          { className: "nav-left" },

          React.createElement("img", {
            src: "/logo.png",
            className: "logo",
            alt: "logo",
          }),

          React.createElement(
            "div",
            null,

            React.createElement(
              "h3",
              { className: "portal-title" },
              "Licensing of Certifying Authorities",
            ),

            React.createElement(
              "p",
              { className: "portal-sub" },
              "Dashboard for DSCs & eSign Services",
            ),
          ),
        ),

        React.createElement(
          "div",
          { className: "nav-user-box" },

          React.createElement("div", { className: "avatar" }, "KJ"),

          React.createElement(
            "div",
            null,

            React.createElement("p", { className: "user-name" }, "Krishna Jha"),

            React.createElement(
              "span",
              { className: "user-role" },
              "Authorized Officer",
            ),
          ),

          React.createElement(
            "button",
            {
              onClick: () => {
                localStorage.removeItem("token");

                navigate("/");
              },

              style: {
                marginTop: "10px",
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "8px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              },
            },

            "Logout",
          ),
        ),
      ),

      // ================= BODY =================

      React.createElement(
        "div",
        { className: "main-body" },

        // ================= HEADER =================

        React.createElement(
          "div",
          { className: "header-row" },

          React.createElement(
            "div",
            null,

            React.createElement(
              "h1",
              { className: "page-title" },
              "CCA Analytics Dashboard",
            ),

            React.createElement(
              "p",
              { className: "page-sub" },
              "Monitoring DSC issuance, eSign approvals, audits and licensing activities.",
            ),
          ),

          React.createElement(
            "div",
            { className: "year-filter" },

            ["2026", "2025", "2024"].map((y) =>
              React.createElement(
                "button",
                {
                  key: y,

                  className: "year-btn " + (activeYear === y ? "active" : ""),

                  onClick: () => setActiveYear(y),
                },

                y,
              ),
            ),
          ),
        ),

        // ================= STATS =================

        React.createElement(
          "div",
          { className: "stats-grid" },

          statCard(
            "Total Applications",
            totalApplications,
            "Applications in database",
            "blue",
          ),

          statCard(
            "Pending Applications",
            pendingApplications,
            "Waiting for approval",
            "dark",
          ),

          statCard(
            "Approved Applications",
            approvedApplications,
            "Approved successfully",
            "green",
          ),

          statCard(
            "Rejected Applications",
            rejectedApplications,
            "Rejected records",
            "sky",
          ),
        ),

        // ================= CHARTS =================

        React.createElement(
          "div",
          { className: "chart-grid" },

          React.createElement(
            "div",
            { className: "chart-card large" },

            React.createElement(
              "div",
              { className: "chart-header" },

              React.createElement("h3", null, "Monthly Applications Analytics"),

              React.createElement("span", null, "Live Database Data"),
            ),

            React.createElement(BarChart, {
              height: 320,

              xAxis: [
                {
                  scaleType: "band",
                  data: months,
                },
              ],

              series: [
                {
                  data: monthlyValues,
                  label: "Applications",
                  color: "#7c3aed",
                },
              ],
            }),
          ),

          React.createElement(
            "div",
            { className: "chart-card" },

            React.createElement(
              "div",
              { className: "chart-header" },

              React.createElement("h3", null, "Application Status"),
            ),

            React.createElement(PieChart, {
              height: 320,

              series: [
                {
                  data: pieData,
                  innerRadius: 50,
                  outerRadius: 100,
                  paddingAngle: 3,
                  cornerRadius: 5,
                },
              ],
            }),
          ),
        ),

        // ================= TABLE =================

        React.createElement(
          "div",
          { className: "table-card" },

          React.createElement(
            "div",
            { className: "chart-header" },

            React.createElement("h3", null, "Recent Applications"),
          ),

          React.createElement(
            "table",
            { className: "activity-table" },

            React.createElement(
              "thead",
              null,

              React.createElement(
                "tr",
                null,

                React.createElement("th", null, "ID"),
                React.createElement("th", null, "Name"),
                React.createElement("th", null, "Mobile"),
                React.createElement("th", null, "Email"),
                React.createElement("th", null, "Status"),
                React.createElement("th", null, "Created At"),
                React.createElement("th", null, "Action"),
              ),
            ),

            React.createElement(
              "tbody",
              null,

              applications.length > 0
                ? applications.map((app) =>
                    React.createElement(
                      "tr",
                      { key: app.id },

                      React.createElement("td", null, app.id),
                      React.createElement("td", null, app.name),
                      React.createElement("td", null, app.mobile),
                      React.createElement("td", null, app.email),
                      React.createElement("td", null, app.status),

                      React.createElement(
                        "td",
                        null,

                        app.created_at
                          ? new Date(app.created_at).toLocaleDateString()
                          : "N/A",
                      ),

                      React.createElement(
                        "td",
                        null,

                        React.createElement(
                          "button",
                          {
                            onClick: () => deleteApplication(app.id),

                            style: {
                              background: "#ef4444",
                              color: "white",
                              border: "none",
                              padding: "8px 14px",
                              borderRadius: "8px",
                              cursor: "pointer",
                              fontWeight: "600",
                            },
                          },

                          "Delete",
                        ),
                      ),
                    ),
                  )
                : React.createElement(
                    "tr",
                    null,

                    React.createElement(
                      "td",
                      {
                        colSpan: 7,

                        style: {
                          textAlign: "center",
                          padding: "20px",
                        },
                      },

                      "No Applications Found",
                    ),
                  ),
            ),
          ),
        ),

        // ================= ACTION BUTTONS =================

        React.createElement(
          "div",
          { className: "action-row" },

          React.createElement(
            "button",
            {
              className: "action-btn",

              onClick: () => navigate("/intent-form"),
            },

            "New Intent Application",
          ),

          React.createElement(
            "button",
            {
              className: "action-btn secondary",
            },

            "Generate Reports",
          ),

          React.createElement(
            "button",
            {
              className: "action-btn secondary",
            },

            "Audit Overview",
          ),
        ),
      ),
    ),
  );
}

export default Dashboard;
