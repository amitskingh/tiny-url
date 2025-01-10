const express = require("express");
const { Pool } = require("pg");
const { createClient } = require("redis");

const app = express();
const port = 3000;

// PostgreSQL Configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test PostgreSQL Connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("PostgreSQL Error:", err);
  } else {
    console.log("PostgreSQL Connected:", res.rows[0]);
  }
});

// Redis Configuration
const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

// Redis Event Listeners
redisClient.on("connect", () => console.log("Connected to Redis"));
redisClient.on("error", (err) => console.error("Redis Error:", err));

// Connect Redis
(async () => {
  await redisClient.connect();
  await redisClient.set("test", "Hello Redis!");
  const value = await redisClient.get("test");
  console.log("Redis Test Value:", value);
})();

// Start Express Server
app.get("/", (req, res) => {
  res.send("Hello dude!! from Node.js, PostgreSQL, and Redis!");
});

app.listen(port, () => {
  console.log(`App running great:  http://localhost:${port}`);
});
