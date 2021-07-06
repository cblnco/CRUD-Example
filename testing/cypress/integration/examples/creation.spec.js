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

	cy.get('.bx--modal-footer > .bx--btn--primary').click();
	cy.get('.app__person-row').contains(name).should('exist');

	cy.get('.app__person-row').contains(name).find('button:nth-child(2)').click();
	cy.get('.app__person-row').contains(name).should('not.exist');
});

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
