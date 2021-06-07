// Initialize section.
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// CORS setup.
const corsOptions = {
  origin: 'http://localhost:9001',
};

app.use(cors(corsOptions));

// Parse application/json requests.
app.use(bodyParser.json());

// Parse urlencoded requests.
app.use(bodyParser.urlencoded({ extended: true }));

// Main route.
app.get("/", (req, res) => {
  res.json({ response: "CRUD GET response." });
});

// Server port to listen requests.
const PORT = process.env.PORT || 9001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
