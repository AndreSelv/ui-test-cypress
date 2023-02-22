const { defineConfig } = require("cypress");
const fs = require("fs");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  projectId: "x4knte",
  _README: "Intellisense can be set up https://docs.cypress.io/guides/tooling/intelligent-code-completion.html#Set-up-in-your-Dev-Environment-1",
  env: {
    USERNAME: "testUser",
    PASSWORD: "123456vV_",
    ORG: "43463811-54b2-4495-8735-4496ad190779",
    USER: "c512940c-6b1a-458f-88af-63b8f9627398",
    SIZES: ["macbook-16"],
    ORIENTATION: ["portrait"],
    REACT_APP_AMPLIFY_AUTH_REGION: "us-east-1",
    REACT_APP_AMPLIFY_AUTH_IDENTITY_POOL_ID: "us-east-1:4c0822ae-3458-4113-ae59-877a80da7d48",
    REACT_APP_AMPLIFY_AUTH_USER_POOL_ID: "us-east-1_38HmfG1Q5",
    REACT_APP_AMPLIFY_AUTH_USER_POOL_WEB_CLIENT_ID: "5hsh1ckjbg3a8600m2tpg28e6m"
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




    }, specPattern: "cypress/e2e/**/*.*",
    baseUrl: "http://localhost:3000",
    excludeSpecPattern: process.env.CE ? "cypress/e2e/e2e-testing" : process.env.CI ? "cypress/e2e/all.cy.js" : []
  },

  component: {
    devServer: {
      framework: "create-react-app", bundler: "webpack",
    },
  },
});
