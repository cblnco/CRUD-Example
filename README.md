# Session 4: Implementing controllers.

### Prerequisites:
[Studio 3T](https://studio3t.com/download/?source=robomongo&medium=homepage)

## Steps for this session:

1. Add the following code into in the `create` controller:
```js
  // Validate request.
  if (!req.body.name || !req.body.job) {
    res.status(400).send({ message: "You must provide a name and a job." });
    return;
  }

  // Create a Person.
  const person = new Person({
    name: req.body.name,
    job: req.body.job,
    address: req.body.address || ""
    phone: req.body.phone || 000000
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
```
2. Add the following code into the `findAll` handler:
```js
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
```

3. Add this content into the `findOne` handler:
```js
exports.findOne = (req, res) => {
  const id = req.params.id;

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
```

4. Add this conten in the `update` controller:
```js
if (!req.body) {
    return res.status(400).send({
      message: "Data cannot be empty."
    });
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
      res.status(500).send({
        message: `An error happened while updating: ${id}`
      });
    });
```

5. Add the following code into the `delete` handler:
```js
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
```

6. Add this code into the `deleteAll` handler:
```js
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
```

7. Now add a the following content into the `findAllKids` handler:
```js
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
```

8. Create a `routes` directory inside of `crud`.

9. Add a `person.routes.js` inside of `crud` with this code:
```js
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
```

10. Finally, import the previously created routes into our `server.js`. Put the following line before `app.listen()`:
```js
require("./app/routes/person.routes")(app);
```

# Extra steps:

* Create, Read, Update and Delete entries with Postman.
* Verify our local mongoDB instance.

