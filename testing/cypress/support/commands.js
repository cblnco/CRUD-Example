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
