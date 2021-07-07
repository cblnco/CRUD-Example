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
