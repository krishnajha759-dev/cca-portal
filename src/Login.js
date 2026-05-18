import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import API from "./api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ================= LOGIN =================

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", {
        email,
        password,
      });

      // SAVE TOKEN
      localStorage.setItem("token", res.data.token);

      alert("Login Successful ✅");

      // REDIRECT
      navigate("/dashboard");
    } catch (err) {
      console.log(err);

      alert("Invalid email or password");
    }
  };

  return React.createElement(
    "div",
    { className: "login-container" },

    React.createElement(
      "div",
      { className: "login-box" },

      // Brand
      React.createElement(
        "div",
        { className: "login-brand" },

        React.createElement("img", {
          src: "/logo.png",
          alt: "CCA Logo",
          className: "login-brand-logo",
        }),

        React.createElement(
          "div",
          { className: "login-brand-name" },

          "CCA Licensing Portal",

          React.createElement("span", null, "Government of India"),
        ),
      ),

      // Title
      React.createElement("h2", { className: "login-title" }, "Welcome Back"),

      React.createElement(
        "p",
        { className: "login-subtitle" },
        "Sign in to access your account",
      ),

      // Email
      React.createElement(
        "label",
        { className: "login-label" },
        "Username / Email",
      ),

      React.createElement("input", {
        type: "text",
        placeholder: "Enter your username or email",
        value: email,
        onChange: (e) => setEmail(e.target.value),
        className: "login-input",
      }),

      // Password
      React.createElement("label", { className: "login-label" }, "Password"),

      React.createElement("input", {
        type: "password",
        placeholder: "Enter your password",
        value: password,
        onChange: (e) => setPassword(e.target.value),
        className: "login-input",
      }),

      // Login Button
      React.createElement(
        "button",
        {
          className: "login-btn",
          onClick: handleLogin,
        },
        "Login to Portal",
      ),

      // Footer
      React.createElement(
        "div",
        { className: "login-footer" },

        "Don't have an account? ",

        React.createElement("a", { href: "#" }, "Register here"),
      ),

      // Back Button
      React.createElement(
        "button",
        {
          className: "back-home",
          onClick: () => navigate("/"),
        },
        "← Back to Home",
      ),
    ),
  );
}

export default Login;

