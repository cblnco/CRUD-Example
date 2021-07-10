/// <reference types="cypress" />

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

let newPerson;

defineParameterType({
	name: 'boolean',
	regexp: /true|false/,
	transformer: (s) => (s === 'true' ? true : false),
});

// Testing the Cucumber criteria
Given("I'm on CURD-sample's main page", () => {
	cy.visit('localhost:3000');
	// cy.screenshot();

	/*
  // Example of the 'And' keyword.
  And("the 'Add a new person' overlay is open", () => {
    cy.get('#add-new-entry').click();
    cy.get('.bx--modal-header__heading').should('be.visible');
    cy.screenshot();
  });*/

	When(
		'I register a person with the name as {string} and job as {string} and address as {string} and phone as {int} and has kids as {boolean}',
		(name, job, address, phone, hasKids) => {
			newPerson = {
				name,
				job,
				address,
				phone,
				hasKids,
			};

			cy.addPerson(newPerson);
			// cy.screenshot();
		}
	);

	Then(
		'the person should be registered in the application with the proportioned data',
		() => {
			cy.verifyIfPerson(newPerson, 'exist');
			cy.get('.app__person-row')
				.contains(newPerson.name)
				.find('.bx--structured-list-td')
				.then(([uiName, uiJob, uiAddress, uiPhone, uiHasKids]) => {
					// Assert ui values against the updated values.
					expect(uiName.innerText).to.be.equal(newPerson.name);
					expect(uiJob.innerText).to.be.equal(newPerson.job);
					expect(Number(uiPhone.innerText)).to.be.equal(newPerson.phone);
					expect(uiAddress.innerText).to.be.equal(newPerson.address);
					expect(uiHasKids.innerText === 'true').to.be.equal(newPerson.hasKids);
					// cy.screenshot();
				});
		}
	);
});

after(() => {
	cy.deletePerson(newPerson);
	cy.verifyIfPerson(newPerson, 'not.exist');
});
