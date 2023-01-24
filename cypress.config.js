const { defineConfig } = require("cypress");
const fs = require("fs");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  projectId: "ix7quu",
  _README: "Intellisense can be set up https://docs.cypress.io/guides/tooling/intelligent-code-completion.html#Set-up-in-your-Dev-Environment-1",
  env: {
    USERNAME: "testUser",
    PASSWORD: "123456vV_",
    ORG: "43463811-54b2-4495-8735-4496ad190779",
    USER: "06e9ac1b-fd4c-41b9-9b2c-779aa720fd0a",
    SIZES: ["macbook-16"],
    ORIENTATION: ["portrait"],
    REACT_APP_AMPLIFY_AUTH_REGION: "us-east-1",
    REACT_APP_AMPLIFY_AUTH_IDENTITY_POOL_ID: "us-east-1:223f9f6a-cc23-4d1d-918e-2a57648920cd",
    REACT_APP_AMPLIFY_AUTH_USER_POOL_ID: "us-east-1_KuXB2h1R0",
    REACT_APP_AMPLIFY_AUTH_USER_POOL_WEB_CLIENT_ID: "4em6lfn3kus11nloo2v9k9asce"
  },

  reporter: "cypress-multi-reporters",

  reporterOptions: {
    configFile: "cypress-reporter.json",
  },

  defaultCommandTimeout: 30000,
  viewportWidth: 1536,
  viewportHeight: 960,
  chromeWebSecurity: false,
  includeShadowDom: true,

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());


      on('task', {
        countFiles(folderName) {
          return new Promise((resolve, reject) => {
            fs.readdir(folderName, (err, files) => {
              if (err) {
                return reject(err)
              }

              resolve(files.length)
            })
          })
        },
      })

      on('task', {
        deleteFolder(folderName) {
          console.log('deleting folder %s', folderName)

          return new Promise((resolve, reject) => {
            fs.rmdir(folderName, { maxRetries: 10, recursive: true }, (err) => {
              if (err) {
                console.error(err)
                return reject(err)
              }
              resolve(null)
            })
          })
        },
      })

    },
    specPattern: "cypress/e2e/**/*.*",
    baseUrl: "https://app-dev.aaiscognito.com",
    excludeSpecPattern: process.env.CI ? "cypress/e2e/all.cy.js" : [],
  },

  component: {
    devServer: {
      framework: "create-react-app", bundler: "webpack",
    },
  },
});
