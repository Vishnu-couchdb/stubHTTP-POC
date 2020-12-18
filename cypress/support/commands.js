// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.overwrite("visit", (originalFn, url, options = {}) => {
    const username = Cypress.env("WALL_USERNAME");
    const password = Cypress.env("WALL_PASSWORD");
    const backend = Cypress.env("CP_API_URL");
    if (username && password) {
        return originalFn(url, {
            auth: {
                username,
                password
            },
            onBeforeLoad: win => {
                win.CypressFlags = {
                    backend: backend
                };
            },
            ...options
        });
    }
    return originalFn(url, {
        onBeforeLoad: win => {
            win.CypressFlags = {
                backend: backend
            };
        },
        ...options
    });
});
