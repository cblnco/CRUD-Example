/// <reference types="cypress" />

let peopleArray;

before(() => {
  cy.intercept('GET', '/api/person', {fixture: 'people.json'}).as(
    'getAllPeople'
  );
  cy.fixture('people').then(people => (peopleArray = people));
  cy.visit('localhost:3000');
});

it('Validate response lenght.', () => {
  cy.wait('@getAllPeople');
  cy.verifyIfPeople(peopleArray, 'exist');
  cy.screenshot();
  cy.deletePeople(peopleArray);
  cy.verifyIfPeople(peopleArray, 'not.exist');
  cy.screenshot();
});
