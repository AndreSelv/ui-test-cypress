/* eslint-disable no-param-reassign */
import  { Auth } from "aws-amplify";
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
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add("initAmplify", () => {
  const amplifySettings = {
    Auth: {
      identityPoolId: Cypress.env("REACT_APP_AMPLIFY_AUTH_IDENTITY_POOL_ID"),
      region: Cypress.env("REACT_APP_AMPLIFY_AUTH_REGION"),
      userPoolId: Cypress.env("REACT_APP_AMPLIFY_AUTH_USER_POOL_ID"),
      userPoolWebClientId: Cypress.env(
        "REACT_APP_AMPLIFY_AUTH_USER_POOL_WEB_CLIENT_ID"
      ),
      mandatorySignIn: true,
    },
  };
  Auth.configure(amplifySettings);
});

Cypress.Commands.add("login", async (user = Cypress.env("USERNAME"), pass = Cypress.env("PASSWORD")) => {
  await Auth.signIn(user, pass);
});



Cypress.Commands.add("bootStrapOrg1", () => {
  cy.intercept("GET", "/orgs", { fixture: "orgs/orgs.json" });
  cy.intercept("GET", "/orgs/org1", { fixture: "orgs/org1/org1.json" });
  cy.intercept("GET", "/users/659a5e72-01c2-41dc-b962-e797b25d1636", { fixture: "orgs/org1/user.json" });

  for (let i = 1; i <= 8; i++) {
    cy.fixture("orgs/org1/user").then((user) => {
      user.orgs = ["org1"];
      user.lastName = "Lastname" + i;
      user.firstName = "User" + i;
      user.userId = "user" + i;
      user.email = "user" + i + "@aaisdirect.com";
      user.updated = new Date().toISOString();
      cy.intercept("GET", "/users/user" + i, user);
    });
  }
  cy.intercept("GET", "/users?userIds=659a5e72-01c2-41dc-b962-e797b25d1636,user1,user2,user3,user4,user5,user6,user7,user8", { fixture: "orgs/org1/users.json" });
});
