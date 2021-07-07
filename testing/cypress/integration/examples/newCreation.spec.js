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
