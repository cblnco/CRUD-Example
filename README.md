# Session 15: Cypress fixtures and create new people interactions.

## Steps for this session:

1. Delete the `example.json` file located in `testing\cypress\integration\examples\`.

2. Create a `creation.spec.js` file inside `testing\cypress\integration\examples\` with the following lines:

```js
/// <reference types="cypress" />

let peopleArray;

before(() => {
	// Get fixture data.
	cy.fixture('people').then((people) => (peopleArray = people));
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
	const { name, job, address, phone, hasKids } = peopleArray[0];
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

7. Now we will use the previous commands to add multiple entries in the CRUD application and assert if they exist and delete them:

```js
describe('First test case group', () => {
	it('Add people test case', () => {
		peopleArray.forEach(({ name, job, address, phone, hasKids }) => {
			cy.get('#add-new-entry').click();

			cy.get('#person-name').type(name);
			cy.get('#person-job').type(job);
			cy.get('#person-address').type(address);
			cy.get('#person-phone').type(phone);

			if (hasKids) {
				cy.get('.bx--checkbox-label').click();
			}

			cy.get('.bx--modal-footer > .bx--btn--primary').click();
			cy.get('.app__person-row').contains(name).should('exist');
		});
	});

	after(() => {
		peopleArray.forEach(({ name }) => {
			cy.get('.app__person-row').contains(name).find('button:nth-child(2)').click();
			cy.get('.app__person-row').contains(name).should('not.exist');
		});
	});
});
```

8. Run the previous test and you will see how it adds multiple people from our `people.json` fixtures.

**Note:** _You can check all the files in this branch to see all the code changes we have made._
