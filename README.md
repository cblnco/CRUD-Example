# Session 16: Cypress Actions and Commands.

## Steps for this session:

1. We are going to implement all the events in an new `utils.js` file under `testing\cypress\support\` with the following code:

```js
/// <reference types="cypress" />

export const addPerson = ({ name, job, address, phone, hasKids }) => {
	cy.get('#add-new-entry').click();

	cy.get('#person-name').type(name);
	cy.get('#person-job').type(job);
	cy.get('#person-address').type(address);
	cy.get('#person-phone').type(phone);

	if (hasKids) {
		cy.get('.bx--checkbox-label').click();
	}

	cy.get('.bx--modal-footer > .bx--btn--primary').click();
};

export const addPeople = (peopleArray) => {
	peopleArray.forEach((person) => addPerson(person));
};

export const verifyIfPerson = ({ name }, sentence) => {
	cy.get('.app__person-row').contains(name).should(sentence);
};

export const verifyIfPeople = (peopleArray, sentence) => {
	peopleArray.forEach((person) => verifyIfPerson(person, sentence));
};

export const deletePerson = ({ name }) => {
	cy.get('.app__person-row').contains(name).find('button:nth-child(2)').click();
};

export const deletePeople = (peopleArray) => {
	peopleArray.forEach((person) => deletePerson(person));
};

export const updatePerson = ({ name, job, address, phone, hasKids }) => {
	cy.get('#edit-modalperson-name').clear();
	cy.get('#edit-modalperson-name').type(name);

	cy.get('#edit-modalperson-job').clear();
	cy.get('#edit-modalperson-job').type(job);

	cy.get('#edit-modalperson-address').clear();
	cy.get('#edit-modalperson-address').type(address);

	cy.get('#edit-modalperson-phone').clear();
	cy.get('#edit-modalperson-phone').type(phone);

	if (hasKids) {
		cy.get(
			'#edit-modal-body > .bx--grid > :nth-child(5) > .bx--col-lg-3 > .bx--form-item > .bx--checkbox-label'
		).click();
	}

	cy.get(
		'#edit-modal > .bx--modal-container > .bx--modal-footer > .bx--btn--primary'
	).click();
};
```

2. In order to use the previous commands with `cy`, we need to include them in the `commands.js` file like so:

```js
import {
	addPeople,
	addPerson,
	updatePerson,
	verifyIfPerson,
	verifyIfPeople,
	deletePerson,
	deletePeople,
} from './util';

Cypress.Commands.add('addPerson', addPerson);
Cypress.Commands.add('addPeople', addPeople);
Cypress.Commands.add('verifyIfPerson', verifyIfPerson);
Cypress.Commands.add('verifyIfPeople', verifyIfPeople);
Cypress.Commands.add('deletePeople', deletePeople);
Cypress.Commands.add('deletePerson', deletePerson);
Cypress.Commands.add('updatePerson', updatePerson);
```

3. Each of the previous events will help us to use them as individual actions or commands, now let's create a `newCreation.spec.js` file under `testing/cypress/examples/` with this code:

```js
// Refactored Creation test cases using individual actions and commands
/// <reference types="cypress" />

import { addPerson, verifyIfPerson, deletePerson } from '../../support/util';

let peopleArray;

before(() => {
	// Get fixture data.
	cy.fixture('people').then((people) => (peopleArray = people));
});

beforeEach(() => {
	// Visit the CRUD-Sample application in each test case.
	cy.visit('localhost:3000');
});

it('Creates a person using actions.', () => {
	addPerson(peopleArray[0]);
	verifyIfPerson(peopleArray[0], 'exist');
	deletePerson(peopleArray[0]);
	verifyIfPerson(peopleArray[0], 'not.exist');
});

it('Creates people using commands', () => {
	// Add people.
	cy.addPeople(peopleArray);
	cy.verifyIfPeople(peopleArray, 'exist');

	// Delete people.
	cy.deletePeople(peopleArray);
	cy.verifyIfPeople(peopleArray, 'not.exist');
});
```

4. Now we will continue with the update events, create an `update.spec.js` file in `testing/cypress/examples/`:

```js
/// <reference types="cypress" />

let peopleArray;

before(() => {
	// Get fixture data.
	cy.fixture('people').then((people) => {
		peopleArray = people;
		cy.visit('localhost:3000');
		cy.addPerson(peopleArray[0]);
	});
});

it('Updates a previously created person.', () => {
	// Cretes a new updated person.
	const { name, job, address, hasKids } = peopleArray[0];
	const updatedPerson = {
		name: `${name} Updated`,
		job: `${job} Professional`,
		address: `${address} 3892`,
		phone: 4565656,
		hasKids: !hasKids,
	};

	cy.get('.app__person-row').contains(name).find('button:nth-child(1)').click();
	cy.updatePerson(updatedPerson); //bx--structured-list-td
	cy.get('.app__person-row')
		.contains(updatedPerson.name)
		.find('.bx--structured-list-td')
		.should(([uiName, uiJob, uiAddress, uiPhone, uiHasKids]) => {
			// Assert ui values against the updated values.
			expect(uiName.innerText).to.be.equal(updatedPerson.name);
			expect(uiJob.innerText).to.be.equal(updatedPerson.job);
			expect(Number(uiPhone.innerText)).to.be.equal(updatedPerson.phone);
			expect(uiAddress.innerText).to.be.equal(updatedPerson.address);
			expect(uiHasKids.innerText === 'true').to.be.equal(updatedPerson.hasKids);
		});
	cy.deletePerson(updatedPerson);
	cy.verifyIfPerson(updatedPerson, 'not.exist');
});
```

5. In the previous test case we are using our update events and also verifying that the UI name corrrectly matches our updated inputs, finally you can run these tests with `npx cypress open` and verify the tescases.

**Note:** _You can check all the files in this branch to see all the code changes we have made._
