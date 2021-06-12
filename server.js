// Initialize section.
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./crud/models");
const app = express();

// CORS setup.
const corsOptions = {
	origin: "http://localhost:9001",
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

app.put("/", (req, res) => {
	res.json({ response: "PUT response." });
});

app.post("/", (req, res) => {
	res.json({ response: "POST response." });
});

app.patch("/", (req, res) => {
	res.json({ response: 09343498 });
});

app.delete("/", (req, res) => {
	res.json({ response: "The person was Deleted successfully." });
});

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to the db!");
  })
  .catch(err => {
    console.log("Error while connecting to the db.", err);
    process.exit();
});

require("./crud/routes/person.routes")(app);

// Server port to listen requests.
const PORT = process.env.PORT || 9001;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

