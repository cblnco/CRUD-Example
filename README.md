# Session 14: Getting started with Cypress.

## Steps for this session:

1. Delete the previously created `cypress` directory located in the root of the project along with.

2. Create a `testing` riectory in the root of the project and install cypress on it:

```bash
mkdir testing
cd testing
```

3. Run `npm init` to initialize a `package.json` and answer the command line prompts accordingly.

4. Then install Cypress with the following command:

```bash
npm install cypress
```

5. After the installation has completed you can open Cypress by running:

```bash
npx cypress open
```

6. If everything works correctly, now you can create a new `basics.spec.js` file under `cypress/integration/exmaples` with the following code:

```js
/// <reference types="cypress" />

it('Simple functionality on CRUD-Sample application.', () => {
  cy.visit('localhost:3000');
});
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
