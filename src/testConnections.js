import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

// Create a new Sequelize instance with your Docker settings
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT || 5432, // Use the default PostgreSQL port if not set
  }
)

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate()
    console.log("Connection to PostgreSQL has been established successfully.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  } finally {
    await sequelize.close() // Ensure the connection is closed after testing
  }
}

// Call the testConnection function
testConnection()
