# Session 15: Cypress fixtures and create new people interactions.

## Steps for this session:

1. Delete the `example.json` file located in `testing\cypress\integration\examples\`.

2. Create a `creation.spec.js` file inside `testing\cypress\integration\examples\` with the following lines:

```js
/// <reference types="cypress" />

let peopleArray;

before(() => {
  // Get fixture data.
  cy.fixture('people').then(people => (peopleArray = people));
});

beforeEach(() => {
  // Visit the CRUD-Sample application in each test case.
  cy.visit('localhost:3000');
});
```

3. Add a `people.json` file inside `testing/cypress/fixtures/` with an array of people like so:

```json
[
  {
    "name": "Cypress test person",
    "job": "Software tester",
    "address": "Cypress av.",
    "phone": 23840823,
    "hasKids": false
  },
  {
    "name": "Cypress Devops Person",
    "job": "Devops Engineer",
    "address": "CY st.",
    "phone": 33982138,
    "hasKids": false
  }
]
```

4. Then we will implement a group with one test case in `creation.spec.js` that types the data of one person in the application:

```js
it('Creates a single new person and deletes it.', () => {
  const {name, job, address, phone, hasKids} = peopleArray[0];
  cy.get('#add-new-entry').click();

  cy.get('#person-name').type(name);
  cy.get('#person-job').type(job);
  cy.get('#person-address').type(address);
  cy.get('#person-phone').type(phone);

  if (hasKids) {
    cy.get('.bx--checkbox-label').click();
  }
});
```

5. After we ran the application, it's time to add the person and assert that it exists:

```js
.
.
.
cy.get('.bx--modal-footer > .bx--btn--primary').click();
cy.get('.app__person-row').contains(name).should('exist');
```

6. The previous assertion will verify that the entry that we added does exist, but we still need to delete the new entry, so we can leave the application as it was before:

```js
.
.
.
cy.get('.app__person-row')
      .contains(name)
      .find('button:nth-child(2)')
      .click();
```

7. Now we are going to select the `Add new entry` button with this Cypress sentence:

```js
cy.get(`#add-new-entry`);
```

8. We can also get the same button in different ways:

```js
cy.get('.app__new-btn');

cy.get('#main-btn-container button:nth-child(1)');
```

9. Add the `.click()` function to the `cy.get('#main-btn-container button:nth-child(1)')` sentence and verify if the `Add a new person` modal is visible:

```js
// Interacting with the 'Add new entry' button and clicking it.
cy.get('#main-btn-container button:nth-child(1)').click();

// Then we verify if the 'Add a new person' modal header is visible.
cy.get('.bx--modal-header__heading').should('be.visible');
```

10. Then we click the `Cancel` button an verify that it's not visible to confirm that the overlay is closed:

```js
// Click the modal's cancel button.
cy.get('.bx--btn--secondary').click();

// Confirm that the modal has been closed.
cy.get('.bx--modal-header__heading').should('not.be.visible');
```

11. Now we are going to create another scenario to test the `/api/person` calls in the UI:

```js
it('Verify GET /api/person calls in CRUD-Sample application.', () => {
  // Intercept will help us to spy on every GET request made to /api/person.
  cy.intercept({
    method: 'GET',
    url: '/api/person',
  }).as('refreshCheck');

  cy.visit('localhost:3000');
});
```

12. Since the CRUD-Sample application gets all the database entries at the begining, we will wait for that API request and verify if it's status is equal to `304`:

```js
// Wait for the /api/person GET request with the alias that we wrote previously.
cy.wait('@refreshCheck').should(({response}) => {
  // Verify that the response object is defined.
  assert.isDefined(response, 'First refresh/read call to MongoDB API.');

  // Verify that the expected status is 304.
  expect(response.statusCode).to.equal(304);
});
```

13. The final thing to do is to verify if the `Refresh` button is making the `/api/person` GET request correclty, so we click that button first:

```js
// Click the 'Refresh' button.
cy.get('#refresh-entries').click();
```

14. And then we wait for the API request and verify it's status:

```js
// Wait for the API call that the 'Refresh' button has started and verify if it has the expected results.
cy.wait('@refreshCheck').should(({response}) => {
  assert.isDefined(response, 'Second refresh/read call to MongoDB API.');
  expect(response.statusCode).to.equal(304);
});
```

**Note:** _You can check all the files in this branch to see all the code changes we have made._
