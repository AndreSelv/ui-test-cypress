const { defineConfig } = require("cypress");
const fs = require("fs");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  projectId: "x4knte",
  _README: "Intellisense can be set up https://docs.cypress.io/guides/tooling/intelligent-code-completion.html#Set-up-in-your-Dev-Environment-1",
  env: {
    USERNAME: "testUser",
    PASSWORD: "123456vV_",
    USERNAME1: "vasilich85+2323",
    ORG: "9998592c-7a66-49f3-a0be-06985cf79003",
    USER: "f961172d-ad3c-4422-801b-5e19f105cf70",
    USER1: "28a3848f-6e90-4726-b458-175ba2122fe7",
    SIZES: ["macbook-16"],
    ORIENTATION: ["portrait"],
    REACT_APP_AMPLIFY_AUTH_REGION: "us-east-1",
    REACT_APP_AMPLIFY_AUTH_IDENTITY_POOL_ID: "us-east-1:b63713c4-7874-46c9-a67b-e16613066212",
    REACT_APP_AMPLIFY_AUTH_USER_POOL_ID: "us-east-1_yVYyVPQz3",
    REACT_APP_AMPLIFY_AUTH_USER_POOL_WEB_CLIENT_ID: "77d8m2cdg33i7sth95j10rcel5",
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
    async setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());

      on("task", {
        countFiles(folderName) {
          return new Promise((resolve, reject) => {
            fs.readdir(folderName, (err, files) => {
              if (err) {
                return reject(err);
              }

              resolve(files.length);
            });
          });
        },
      });

      on("task", {
        deleteFolder(folderName) {
          console.log("deleting folder %s", folderName);

          return new Promise((resolve, reject) => {
            fs.rmdir(folderName, { maxRetries: 10, recursive: true }, (err) => {
              if (err) {
                console.error(err);
                return reject(err);
              }
              resolve(null);
            });
          });
        },
      });
    }, specPattern: "cypress/e2e/**/*.*",
    baseUrl: "https://app-uat.aaisdirect.com",
    excludeSpecPattern: process.env.CE ? "cypress/e2e/e2e-testing" : process.env.CI ? "cypress/e2e/e2e-testing/all.cy.js" : [],
  },

  component: {
    devServer: {
      framework: "create-react-app", bundler: "webpack",
    },
  },
});
