# Session 2: Working with Cypress.

## Prerequisites:

```
Cypress.
```

## Steps for this session:

1. Install Cypress with the following command:
```bash
npm install --save-dev cypress
```
2. Create a folder with the name `cypress` in the root directory of the project.

3. Create a file called `placeholder.test.js` inside of the previous folder with the following code:
```js
describe('Test JSONPlaceholder API', () => {
    // More info about this API: https://jsonplaceholder.typicode.com/guide/.
    Cypress.config("baseUrl","https://jsonplaceholder.typicode.com");

    it('Verify post 55', () => {
        cy.request({
            method: 'GET',
            url: "/posts/55"
        }).then((response) => {
            expect(response).have.property('userId', 6);
            expect(response.body).to.not.be.null;
        });
    });

    it('Updates post 55', () => {
        const data = { 
            id: 1,
            title: 'Test title',
            body: 'Sample body',
            userId: 1,
        };

        cy.request('PUT', "/posts/55", data).then((response) => {
            expect(response).have.property('title', data.title);
            expect(response).have.property('body', data.body);
            expect(response).have.property('userId', data.userId);
        });
    });

    it('Creates post 77', () => {
        const data = { 
            id: 77,
            title: '77th Post',
            body: 'Hello world',
            userId: 5,
        };

        cy.request('POST', "/posts/55", data).its('status').should('eq', 204);
    });
});
```

4. Run the following command:

```bash
npx cypress open
```

## Extra steps:

- Test positive and negative scenarios.
- Test a different entity on the API.
- Visit [Cypress website](https://docs.cypress.io/guides/references/assertions#TDD-Assertions) to learn more about assertions.
