import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const services = [
    {
      img: "Intent.png",
      title: "Intent Registration",
      desc: "Register your intent to become a Certifying Authority with all required eligibility checks.",
    },
    {
      img: "license.png",
      title: "License Application",
      desc: "Submit your complete license application securely through the portal.",
    },
    {
      img: "audit.png",
      title: "Audit Process",
      desc: "Track verification and compliance audit process in real-time.",
    },
    {
      img: "renewal.png",
      title: "License Renewal",
      desc: "Renew your digital certification license with simplified workflow.",
    },
  ];

  const steps = [
    { img: "Intent.png", text: "Register Intent" },
    { img: "submit.png", text: "Submit Application" },
    { img: "document.png", text: "Verification" },
    { img: "audit.png", text: "Audit" },
    { img: "approved.png", text: "Approved" },
    { img: "issued.png", text: "Issued" },
  ];

  return React.createElement(
    "div",
    { className: "main" },

    // ================= HEADER =================
    React.createElement(
      "div",
      { className: "header" },

      React.createElement(
        "div",
        { className: "logo-section" },

        React.createElement("img", {
          src: "/logo.png",
          className: "logo-img",
        }),

        React.createElement(
          "div",
          null,
          React.createElement("h2", null, "CCA Licensing Portal"),
          React.createElement(
            "p",
            null,
            "Controller of Certifying Authorities",
          ),
        ),
      ),

      React.createElement(
        "div",
        { className: "menu" },

        ["Home", "About", "Services", "Process", "FAQ", "Contact"].map((item) =>
          React.createElement(
            "a",
            {
              href: "#",
              key: item,
            },
            item,
          ),
        ),
      ),

      React.createElement(
        "div",
        { className: "auth" },

        React.createElement(
          "button",
          {
            className: "login",
            onClick: () => navigate("/login"),
          },
          "Login",
        ),

        React.createElement(
          "button",
          {
            className: "register",
          },
          "Apply Now →",
        ),
      ),
    ),

    // ================= HERO =================
    React.createElement(
      "div",
      { className: "hero" },

      React.createElement(
        "div",
        { className: "hero-left" },

        React.createElement(
          "span",
          { className: "tag" },
          "Digital Licensing System",
        ),

        React.createElement("h1", null, "Everything for Digital Licensing"),

        React.createElement(
          "p",
          null,
          "From intent registration to license issuance — manage the complete Certifying Authority lifecycle on one secure platform.",
        ),

        React.createElement(
          "div",
          { className: "hero-buttons" },

          React.createElement(
            "button",
            { className: "primary" },
            "Apply for License",
          ),

          React.createElement(
            "button",
            { className: "secondary" },
            "Track Application",
          ),
        ),
      ),

      React.createElement(
        "div",
        { className: "hero-right" },

        React.createElement("img", {
          src: "/main.png",
          className: "hero-img",
        }),
      ),
    ),

    // ================= SERVICES =================
    React.createElement(
      "div",
      { className: "services" },

      React.createElement("p", { className: "small-title" }, "Our Services"),

      React.createElement(
        "h2",
        { className: "section-title" },
        "Complete Digital Licensing Services",
      ),

      React.createElement(
        "div",
        { className: "cards" },

        services.map((item) =>
          React.createElement(
            "div",
            {
              className: "card",
              key: item.title,
            },

            React.createElement("img", {
              src: "/" + item.img,
              className: "card-img",
            }),

            React.createElement("h3", null, item.title),

            React.createElement("p", { className: "card-desc" }, item.desc),

            React.createElement(
              "span",
              { className: "learn-more" },
              "Learn more →",
            ),
          ),
        ),
      ),
    ),

    // ================= STEPS =================
    React.createElement(
      "div",
      { className: "steps" },

      React.createElement("p", { className: "small-title" }, "Process"),

      React.createElement("h2", { className: "section-title" }, "How It Works"),

      React.createElement(
        "div",
        { className: "step-line" },

        steps.map((step) =>
          React.createElement(
            "div",
            {
              className: "step",
              key: step.text,
            },

            React.createElement("img", {
              src: "/" + step.img,
              className: "step-img",
            }),

            React.createElement("p", null, step.text),
          ),
        ),
      ),
    ),

    // ================= ABOUT =================
    React.createElement(
      "div",
      { className: "about" },

      React.createElement("p", { className: "small-title" }, "About Portal"),

      React.createElement(
        "h2",
        { className: "section-title" },
        "India’s Trusted Digital Certification Authority",
      ),

      React.createElement(
        "div",
        { className: "about-box" },

        React.createElement("img", {
          src: "/about.png",
          className: "about-img",
        }),

        React.createElement(
          "div",
          { className: "about-content" },

          React.createElement(
            "p",
            null,
            "The CCA Licensing Portal is the official platform for managing Certifying Authority licenses under the Information Technology Act. The system ensures transparency, security, compliance, and seamless digital certification workflows for all organizations.",
          ),

          React.createElement(
            "a",
            {
              href: "#",
              className: "know-more",
            },
            "Know More →",
          ),
        ),
      ),
    ),

    // ================= FOOTER =================
    React.createElement(
      "div",
      { className: "footer" },

      React.createElement(
        "div",
        { className: "footer-left" },

        React.createElement("img", {
          src: "/nic.png",
          className: "footer-logo",
        }),

        React.createElement("img", {
          src: "/digital.png",
          className: "footer-logo",
        }),
      ),

      React.createElement(
        "div",
        { className: "footer-center" },

        React.createElement(
          "p",
          null,
          "© 2026 Ministry of Electronics & Information Technology",
        ),

        React.createElement(
          "p",
          null,
          "Government of India | Controller of Certifying Authorities",
        ),
      ),

      React.createElement(
        "div",
        { className: "footer-right" },

        React.createElement("img", {
          src: "/india.png",
          className: "india-logo",
        }),
      ),
    ),
  );
}

export default LandingPage;
