# Session 3: MongoDB model.

## Steps for this session:

1. create the following directory structure:
```bash
crud > config
```
2. Create a `db.config.js` file inside `config` with the following code:
```js
module.exports = {
  url: "mongodb://localhost:27017/crud_db"
};
```

3. Add a `models` direcotry inside `crud` and create an `index.js` file with the following code:
```js
// More info about this API: https://jsonplaceholder.typicode.com/guide/.
const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.person = require("./person.model.js")(mongoose);

module.exports = db;
```

4. Add this conten in `server.js`.
```js
const db = require("./crud/models");

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
```

5. Add a `person.model.js` inside `crud/models` with this code:
```js
module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      job: String,
      address: String,
      phone: Number,
      hasKids: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Person = mongoose.model("person", schema);
  return Person;
};
```

6. Create a `crontrollers` directory inside of `crud`.

7. Now add a `person.controller.js` file inside of the `controllers` directory with this content:
```js
const db = require("../models");
const Person = db.person;

// Create and Save a new person.
exports.create = (req, res) => {
  
};

// Retrieve all people from the database.
exports.findAll = (req, res) => {
  
};

// Find a single person with an specific id.
exports.findOne = (req, res) => {
  
};

// Update a person by the id in the request.
exports.update = (req, res) => {
  
};

// Delete a person with the specified id in the request.
exports.delete = (req, res) => {
  
};

// Delete all people from the database.
exports.deleteAll = (req, res) => {
  
};

// Find any person who has kids.
exports.findAllKids = (req, res) => {
  
};
```
