require('dotenv').config();

const express = require("express")

const app = express()

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
  return res.json({ message: "Hey, there working on great project" })
})

app.listen(PORT, () => console.log(`Server started on ${PORT}`))
