// Initialize section.
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./crud/models");
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

// Mongodb connection.
db.mongoose.connect(db.url, {
  useNewUrlParser: true,
  useunifiedTopology: true
})
.then(() => {
  console.log("Successfully onnected to the DB!");
})
.catch(err => {
  console.log("An error happened while connecting to the db", err);
  process.exit();
})

require("./app/routes/person.routes")(app);

// Server port to listen requests.
const PORT = process.env.PORT || 9001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
