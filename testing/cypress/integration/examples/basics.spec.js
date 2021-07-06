/// <reference types="cypress" />

it('Simple functionality on CRUD-Sample application.', () => {
	cy.visit('localhost:3000');
	cy.get('#add-new-entry');
	cy.get('.app__new-btn');

	// Interacting with the 'Add new entry' button and clicking it.
	cy.get('#main-btn-container button:nth-child(1)').click();

	// Then we verify if the 'Add a new person' modal header is visible.
	cy.get('.bx--modal-header__heading').should('be.visible');

	// Click the modal's cancel button.
	cy.get('.bx--btn--secondary').click();

	// Confirm that the modal has been closed.
	cy.get('.bx--modal-header__heading').should('not.be.visible');
});

it('Verify GET /api/person calls in CRUD-Sample application.', () => {
	// Intercept will help us to spy on every GET request made to /api/person.
	cy.intercept({
		method: 'GET',
		url: '/api/person',
	}).as('refreshCheck');

	cy.visit('localhost:3000');

	// Wait for the /api/person GET request with the alias that we wrote previously.
	cy.wait('@refreshCheck').should(({ response }) => {
		// Verify that the response object is defined.
		assert.isDefined(response, 'First refresh/read call to MongoDB API.');

		// Verify that the expected status is 304.
		expect(response.statusCode).to.equal(304);
	});

	cy.get('#refresh-entries').click();

	// Wait for the API call that the 'Refresh' button has started and verify if it has the expected results.
	cy.wait('@refreshCheck').should(({ response }) => {
		assert.isDefined(response, 'Second refresh/read call to MongoDB API.');
		expect(response.statusCode).to.equal(304);
	});
});
