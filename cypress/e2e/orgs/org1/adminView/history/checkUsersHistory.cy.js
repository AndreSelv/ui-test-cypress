const OrganizationPage = require("../../../../../support/PageObjects/OrganizationPage");
const organizationPage = new OrganizationPage();
describe("Change the Info of Users Tab to Check History Records", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.bootStrapOrg1();
          cy.viewport(size, orientation);
        });

        it("Delete User1 Lastname1 History", () => {
          cy.visit("#/orgs/org1");
          cy.fixture("/orgs/org1/history.json").then((history) => {
            history.data[0].action = "delete";
            history.data[0].resourceName = "orgs.users";
            cy.intercept("POST", `/orgs/org1/transactions`, history).as("getEmail");
          });
          organizationPage.getHistoryButton().click()
          cy.contains('John Doe (External User)');});

        it("Add User9 Lastname1 History", () => {
          cy.visit("#/orgs/org1");
          cy.fixture("/orgs/org1/history.json").then((history) => {
            history.data[0].action = "create";
            history.data[0].resourceName = "orgs.users";
            cy.intercept("POST", `/orgs/org1/transactions`, history).as("getEmail");
          });
          organizationPage.getHistoryButton().click()
          cy.contains('John Doe (External User)');});

        it("Update the Role of A User History", () => {
          cy.visit("#/orgs/org1");

          cy.fixture("/orgs/org1/history.json").then((history) => {
            history.data[0].action = "update";
            history.data[0].resourceName = "orgs.users";
            cy.intercept("POST", `/orgs/org1/transactions`, history).as("getEmail");
          });
          organizationPage.getHistoryButton().click()
          cy.contains('John Doe (External User)');});
      });
    });
  });
});
