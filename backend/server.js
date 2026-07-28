const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "devopsdb",
  user: process.env.POSTGRES_USER || "devops",
  password: process.env.POSTGRES_PASSWORD || "devops",
});

// Test DB Connection
pool.connect()
  .then(client => {
    console.log("✅ Connected to PostgreSQL");
    client.release();
  })
  .catch(err => {
    console.error("❌ Database connection failed");
    console.error(err.message);
  });

// Create table if it doesn't exist
async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS employees (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      email VARCHAR(255),
      department VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  
  // Migrate old users table data if it exists
  try {
    const oldUsers = await pool.query("SELECT * FROM users");
    if (oldUsers.rows.length > 0) {
      console.log(`Migrating ${oldUsers.rows.length} old users to employees table...`);
      for (const user of oldUsers.rows) {
        await pool.query(`
          INSERT INTO employees (first_name, last_name, email, department)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT DO NOTHING
        `, [user.first_name, user.last_name, user.email, user.department]);
      }
      console.log("✅ Migration complete!");
    }
  } catch (err) {
    // Ignore if users table doesn't exist
  }

  console.log("✅ employees table ready");
}

initializeDatabase().catch(console.error);

// Root Endpoint
app.get("/", (req, res) => {
  res.json({
    message: "DevOps Demo Running 🚀",
  });
});

// Health Check
app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ status: "Healthy" });
  } catch (err) {
    res.status(500).json({ status: "Database Unreachable" });
  }
});

// Stress Endpoint for HPA Testing
app.get("/stress", (req, res) => {
  const end = Date.now() + 10000; // 10 seconds

  while (Date.now() < end) {
    Math.random() * Math.random();
  }

  res.send("CPU stress completed");
});

// Create Employee
app.post("/employees", async (req, res) => {
  try {
    const { firstName, lastName, email, department } = req.body;

    const result = await pool.query(
      `INSERT INTO employees(first_name, last_name, email, department)
       VALUES($1, $2, $3, $4)
       RETURNING *`,
      [firstName, lastName, email, department]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create employee" });
  }
});

// Get Employees
app.get("/employees", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM employees ORDER BY id");
    console.log("Employees from DB:", result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch employees." });
  }
});

// Update Employee
app.put("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, department } = req.body;

    const result = await pool.query(
      `UPDATE employees 
       SET first_name = $1, last_name = $2, email = $3, department = $4
       WHERE id = $5
       RETURNING *`,
      [firstName, lastName, email, department, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update employee" });
  }
});

// Delete Employee
app.delete("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM employees WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete employee" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
