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
