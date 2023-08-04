const OrganizationPage = require("../../support/PageObjects/OrganizationPage");
const organizationPage = new OrganizationPage();
describe("Check that orgs are created", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.bootStrapOrg1();

          cy.viewport(size, orientation);
        });

        it("Company number field is present into Organization portal", () => {
          cy.visit("#/orgs");
          organizationPage.getCreateOrgButton().click();
          organizationPage.getCompanyNumberField().should("be.visible");
        });

        it("TC4856 Validate that user can not create org with already existing company number ", () => {
          cy.visit("#/orgs");
          organizationPage.getCreateOrgButton().click();
          organizationPage.getCompanyNumberField().should("be.visible");

          organizationPage.getCompanyNameField().type("Company Test Name");
          organizationPage.getCompanyNumberField().type("1111"); //already existing company number
          orientation.getCreateButton().click();
          cy.contains("Org already exists.").should("be.exist");
        });
      });
    });
  });
});
