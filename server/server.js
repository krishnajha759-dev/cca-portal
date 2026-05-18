const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

// ================= MIDDLEWARE =================

app.use(cors());
app.use(express.json());

// ================= DATABASE =================

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "dashboard_db",
  password: "5432",
  port: 5432,
});

// ================= TEST DB =================

db.connect()
  .then(() => console.log("PostgreSQL Connected ✅"))
  .catch((err) => console.log(err));

// ================= HOME =================

app.get("/", (req, res) => {
  res.send("Server Running ✅");
});

// ================= LOGIN =================

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // DEMO LOGIN

    if (email === "admin@gmail.com" && password === "12345") {
      const token = jwt.sign({ email }, "mysecretkey", { expiresIn: "1d" });

      return res.json({
        success: true,
        token,
      });
    }

    res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// ================= GET APPLICATIONS =================

app.get("/applications", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM applications ORDER BY id DESC",
    );

    res.json(result.rows);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
});

// ================= ADD APPLICATION =================

app.post("/applications", async (req, res) => {
  try {
    const { name, mobile, email } = req.body;

    await db.query(
      `
      INSERT INTO applications
      (name, mobile, email, status)
      VALUES ($1, $2, $3, $4)
      `,
      [name, mobile, email, "Pending"],
    );

    res.json({
      success: true,
      message: "Application Added ✅",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Insert Failed",
    });
  }
});

// ================= DELETE APPLICATION =================

app.delete("/applications/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await db.query("DELETE FROM applications WHERE id = $1", [id]);

    res.json({
      success: true,
      message: "Application Deleted ✅",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Delete Failed",
    });
  }
});

// ================= UPDATE STATUS =================

app.put("/applications/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const { status } = req.body;

    await db.query(
      `
      UPDATE applications
      SET status = $1
      WHERE id = $2
      `,
      [status, id],
    );

    res.json({
      success: true,
      message: "Status Updated ✅",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Update Failed",
    });
  }
});

// ================= STATS =================

app.get("/stats", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN status='Pending' THEN 1 ELSE 0 END) AS pending,
        SUM(CASE WHEN status='Approved' THEN 1 ELSE 0 END) AS approved,
        SUM(CASE WHEN status='Rejected' THEN 1 ELSE 0 END) AS rejected
      FROM applications
    `);

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
    });
  }
});

// ================= START SERVER =================

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});
