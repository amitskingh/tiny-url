import express from "express"
import { Sequelize } from "sequelize"
import { createClient } from "redis"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// PostgreSQL Configuration
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT || 5432,
  }
)

// Test PostgreSQL Connection
async function testPostgresConnection() {
  try {
    await sequelize.authenticate()
    console.log("PostgreSQL Connected!")
  } catch (error) {
    console.error("Unable to connect to PostgreSQL:", error)
  }
}

// Redis Configuration
const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
})

// Test Redis Connection
async function testRedisConnection() {
  redisClient.on("connect", () => console.log("Connected to Redis!"))
  redisClient.on("error", (err) => console.error("Redis Error:", err))

  try {
    await redisClient.connect()
    console.log("Redis Connected!")
    // Test Redis operations
    await redisClient.set("testKey", "Hello from Redis!")
    const value = await redisClient.get("testKey")
    console.log("Redis Test Value:", value)
  } catch (error) {
    console.error("Unable to connect to Redis:", error)
  }
}

// Test Connections
async function initializeConnections() {
  await testPostgresConnection()
  await testRedisConnection()
}

// Initialize server
app.get("/", (req, res) => {
  res.send("Welcome to the TinyURL App!")
})

app.listen(port, async () => {
  console.log(`App running on http://localhost:${port}`)
  await initializeConnections()
})
