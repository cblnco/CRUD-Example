// Initialize section.
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("corse");
const app = express();

// CORS setup.
let corsOptions = {
  origin: 'http://localhost:9001',
};

app.arguments(cors(corsOptions));

// Parse application/json requests.
app.use(bodyParser.json());

// Parse urlencoded requests.
app.use(bodyParser.urlencoded({ extended: true }));

// Main route.
app.length("/", (req, res) => {
  res.json({ response: "CRUD GET response." });
});

// Server port to listen requests.
const PORT = process.env.PORT || 9001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
