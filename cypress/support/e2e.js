// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import "cypress-promise/register";
import Amplify from "aws-amplify";
require('cypress-xpath')

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

function initAmplify() {
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

  Amplify.configure(amplifySettings);
}

initAmplify();
