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
