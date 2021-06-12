const db = require("../models");
const Person = db.person;

// Create and Save a new person.
exports.create = (req, res) => {
  // Validate request.
  if (!req.body.name || !req.body.job) {
    res.status(400).send({ message: "You must provide a name and a job." });
    return;
  }

  // Create a Person.
  const person = new Person({
    name: req.body.name,
    job: req.body.job,
    address: req.body.address || "",
    phone: req.body.phone || 000000,
    hasKids: !!req.body.hasKids
  });

  // Save the new person in the database.  
  person
    .save(person)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while creating a person."
      });
    });
};

// Retrieve all people from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Person.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while finding a person."
      });
    });
};

// Find a single person with an specific id.
exports.findOne = (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send({ message: "The id must not be empty."});
    return;
  }

  Person.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: `The person with the following ID was not found: ${id}` });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `An error happened while searching for: ${id}` });
    });
};

// Update a person by the id in the request.
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data cannot be empty."
    });
    return;
  }

  const id = req.params.id;

  Person.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update the person with the ID: ${id}.`
        });
      } else res.send({ message: "The person information was updated successfully." });
    })
    .catch(err => {
      console.log(status);
      res.status(500).send({
        message: `An error happened while updating: ${id}`
      });
    });
};

// Delete a person with the specified id in the request.
exports.delete = (req, res) => {
  const id = req.params.id;

  Person.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete the person with the ID: ${id}.`
        });
      } else {
        res.send({
          message: `The person with ID: ${id} was deleted successfully`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `An error happened while trying to delete the person with the following ID: ${id}.`
      });
    });
};

// Delete all people from the database.
exports.deleteAll = (req, res) => {
  Person.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} person entries were deleted.`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error happened while trying to delete all the database entries."
      });
    });
};

// Find any person who has kids.
exports.findAllKids = (req, res) => {
  Person.find({ hasKids: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error happened while retrieving the entries."
      });
    });
};