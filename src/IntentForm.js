import React from "react";
import { useNavigate } from "react-router-dom";
import "./IntentForm.css";

function IntentForm() {
  const navigate = useNavigate();

  // ================= SUBMIT =================

  async function handleSubmit() {
    const inputs = document.querySelectorAll(".field-input");

    // FINAL FIXED DATA

    const data = {
      name: inputs[2].value, // First Name
      mobile: inputs[5].value, // Mobile Number
      email: inputs[6].value, // Email Address
    };

    // Validation

    if (!data.name || !data.mobile || !data.email) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/applications", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });

      const result = await response.json();

      console.log(result);

      alert("Application Submitted Successfully ✅");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);

      alert("Server Error ❌");
    }
  }

  // ================= RESET =================

  function handleReset() {
    window.location.reload();
  }

  // ================= STEP =================

  function step(num, text, active = false) {
    return React.createElement(
      "div",
      { className: "step " + (active ? "active" : ""), key: num },

      React.createElement("div", { className: "step-num" }, num),

      React.createElement("span", { className: "step-text" }, text),
    );
  }

  // ================= INPUT =================

  function input(placeholder) {
    return React.createElement(
      "div",
      { className: "field-wrap", key: placeholder },

      React.createElement("label", { className: "field-label" }, placeholder),

      React.createElement("input", {
        className: "field-input",
        placeholder: placeholder,
      }),
    );
  }

  // ================= SELECT =================

  function select(text) {
    return React.createElement(
      "div",
      { className: "field-wrap", key: text },

      React.createElement(
        "label",
        { className: "field-label" },
        text.replace("Choose your ", ""),
      ),

      React.createElement(
        "select",
        { className: "field-input field-select" },

        React.createElement("option", null, text),
      ),
    );
  }

  // ================= SECTION =================

  function section(title, icon, gridClass, fields) {
    return React.createElement(
      "div",
      { className: "card", key: title },

      React.createElement(
        "div",
        { className: "section-header" },

        React.createElement("img", {
          src: icon,
          className: "section-icon",
        }),

        React.createElement("h3", { className: "section-title" }, title),
      ),

      React.createElement(
        "div",
        { className: "fields-grid " + gridClass },

        ...fields,
      ),
    );
  }

  // ================= UI =================

  return React.createElement(
    "div",
    { className: "intent-page" },

    // TOPBAR

    React.createElement(
      "div",
      { className: "intent-topbar" },

      React.createElement(
        "div",
        { className: "topbar-left" },

        React.createElement("img", {
          src: "/logo.png",
          className: "topbar-logo",
        }),

        React.createElement(
          "div",
          null,

          React.createElement(
            "span",
            { className: "topbar-title" },
            "CCA Licensing Portal",
          ),

          React.createElement(
            "span",
            { className: "topbar-sub" },
            "Government of India",
          ),
        ),
      ),

      React.createElement(
        "button",
        {
          className: "back-btn",
          onClick: () => navigate("/dashboard"),
        },

        "← Back to Dashboard",
      ),
    ),

    // MAIN CONTAINER

    React.createElement(
      "div",
      { className: "intent-container" },

      // PAGE HEADING

      React.createElement(
        "div",
        { className: "page-heading" },

        React.createElement(
          "h2",
          { className: "title" },
          "Intent Registration Form",
        ),

        React.createElement(
          "p",
          { className: "title-sub" },
          "Fill in the details below to register your intent",
        ),
      ),

      // STEP BAR

      React.createElement(
        "div",
        { className: "step-bar" },

        step("1", "Unique Code", true),

        step("2", "Personal Details"),

        step("3", "Address Details"),

        step("4", "Contact Information"),
      ),

      // UNIQUE CODE

      React.createElement(
        "div",
        { className: "card center" },

        React.createElement(
          "div",
          { className: "section-header" },

          React.createElement(
            "h3",
            { className: "section-title" },
            "Unique Code Verification",
          ),
        ),

        React.createElement(
          "div",
          { className: "verify-row" },

          React.createElement("input", {
            className: "field-input verify-input",
            placeholder: "Enter Unique Code",
          }),

          React.createElement(
            "button",
            { className: "verify-btn" },

            "Verify",
          ),
        ),
      ),

      // PERSONAL DETAILS

      section("Personal Details", "/Personal.png", "grid-3", [
        input("Salutation"),
        input("First Name"),
        input("Middle Name"),
        input("Last Name"),
        input("Mobile Number"),
        input("Email Address"),
      ]),

      // ADDRESS DETAILS

      section("Address Details", "/Address.png", "grid-2", [
        input("Flat/Door/Block No"),
        input("Building/Premises/Village"),
        input("Road/Street/Lane/Post Office"),
        input("Area/Locality/Sub District"),
      ]),

      // CONTACT DETAILS

      section("Contact Details", "/Contact.png", "grid-2", [
        select("Choose your Country"),
        select("Choose your State"),
        select("Choose your District"),
        input("Pin Code"),
      ]),

      // BUTTONS

      React.createElement(
        "div",
        { className: "btns" },

        React.createElement(
          "button",
          {
            className: "reset",
            onClick: handleReset,
          },

          "Reset",
        ),

        React.createElement(
          "button",
          {
            className: "submit",
            onClick: handleSubmit,
          },

          "Submit Application →",
        ),
      ),
    ),
  );
}

export default IntentForm;
