# Session 17: Cypress and Cucumber integration.

## Steps for this session:

1. First install `cypress-cucumber-preprocessor` and `cucumber-html-reporter` with this command under `testing/`:

```bash
	npm install --save-dev cypress-cucumber-preprocessor cucumber-html-reporter
```

2. To integrate the cucumber preprocesor in our project we need to include the following code in the `testting/cypress/plugins/index.js` file:

```js
const cucumber = require('cypress-cucumber-preprocessor').default; // eslint-disable-line

module.exports = (on) => {
	on('file:preprocessor', cucumber());
};
```

3. Now we need to set up these configurations in any place of the `package.json` file of the testing project:

```json
"cypress-cucumber-preprocessor": {
    "nonGlobalStepDefinitions": true,
    "cucumberJson": {
      "generate": true,
      "outputFolder": "cypress/cucumber-json",
      "filePrefix": "",
      "fileSuffix": ".cucumber"
    }
  },
```

4. We need Cypres to run any `.feature`, `.features` or `.spec.js` files, so we modify the `cypress.json` file with the following content:

```js
{
  "testFiles": "**/*.{feature,features,spec.js}"
}
```

5. If we are also going to use the Cucumber html reporter, then we need to create a `cucumber-reporter.js` file under the `testing` folder:

```js
const reporter = require('cucumber-html-reporter');

const options = {
	theme: 'bootstrap',
	jsonFile: 'cypress/cucumber-json',
	output: 'cypress/reports/cucumber_report.html',
	reportSuiteAsScenarios: true,
	scenarioTimestamp: true,
	launchReport: true,
	metadata: {
		'App Version': '0.3.2',
		'Test Environment': 'STAGING',
		Browser: 'Chrome  54.0.2840.98',
		Platform: 'Windows 10',
		Parallel: 'Scenarios',
		Executed: 'Remote',
	},
};

reporter.generate(options);
```

6. With the Cucumber-Cypress integration ready, now we need to create an `AddAPerson.feature` file under `testing/cypress/integration/` with this content:

```
# High level description of the implemented feature and groups related scenarios.
Feature: Registration in CRUD-sample app.
I want to register a new person on the CRUD-sample website.

# Describes a business rule of the application to be tested.
Scenario: Register a single person.

# Describes the initial context of the system, something that happened in the past, puts the system in a known state.
Given I'm on CURD-sample's main page
# And, But keywords: Used when we need to use mutiple Given's, When's or Then's.
# Example: And the 'Add a new person' overlay is open

# Describes the event to be done in the application.
When I register a person with the name as "Amara Diaz" and job as "Software Developer" and address as "Dubrovnik St." and phone as 892834234 and has kids as false

# Describes the expected outcome or result after the events described by the "When" keyword.
Then the person should be registered in the application with the proportioned data
```

7. You can install a Cucumber Syntax extension, like [this one](https://marketplace.visualstudio.com/items?itemName=stevejpurves.cucumber), to add Cucumber syntax and autocompletion snipperts to the `.feature` files.

8. Now we need to implement the actual step definitions so we can run the `Given`, `When` and `Then` sentences, so we create an `AddAPerson` directory under `testing/cypress/integration/` and inside of it we add an `addAPerson.js` file with this content:

```js
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
```

9. With all these changes done, we can run `npx open cypress` so we can run the `AddAPerson.feature` sentences.

10. Afterwards, if you want to use the Cucumber reporter, you can open a new terminal under your `testing` directory and run the following comand:

```bash
node cucumber-reporter.js
```

## Helpful resources:

* [Cypress API Documentation](https://docs.cypress.io/api/table-of-contents)
* [Mochawesome Reporter](https://github.com/adamgruber/mochawesome)
* [Cucumber Gherkin](https://cucumber.io/docs/gherkin/reference/)
* [CSS Selectors Medium article/game](https://medium.com/design-code-repository/css-selectors-cheatsheet-details-9593bc204e3f)
* [IBM's Enterprise Udemy website](https://ibm-learning.udemy.com/organization/home/)

**Note:** _You can check all the files in this branch to see all the code changes we have made._
