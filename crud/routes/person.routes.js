module.exports = app => {
  const people = require("../controllers/person.controller.js");

  var router = require("express").Router();

  // Create a new person.
  router.post("/", people.create);

  // Retrieve all entries.
  router.get("/", people.findAll);

  // Retrieve all people with kids.
  router.get("/hasKids", people.findAllKids);

  // Retrieve a single person with an specific id.
  router.get("/:id", people.findOne);

  // Update a person with a specific id.
  router.put("/:id", people.update);

  // Delete a person with a specific id.
  router.delete("/:id", people.delete);

  // Create a new person.
  router.delete("/", people.deleteAll);

  app.use('/api/person', router);
};