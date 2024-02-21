const OrganizationPage = require("../../support/PageObjects/OrganizationPage");
const organizationPage = new OrganizationPage();

describe("Organization search bar functionality", () => {

  beforeEach(() => {
    cy.initAmplify();
  });

  it("US120079 Validate organization search bar existing", () => {
    cy.login();
    cy.visit("#/orgs");
    organizationPage.getOrganizationSearchBar().should("be.visible");
  });

  it("US120079 Validate organization search func return correct response", () => {
    cy.login();
    cy.visit("#/orgs");
    let testData = "Company";
    organizationPage.getOrganizationSearchBar().should("be.visible").type(testData, { delay: 200 });
    organizationPage.getListOfOrganizations().each(($el) => expect($el.text().toLocaleLowerCase()).contains(testData.toLocaleLowerCase()));
  });

  it("US120079 Validate that non AAISDirect user not be able to see search bar", () => {
    cy.login(Cypress.env("USERNAME1"), Cypress.env("PASSWORD"));
    cy.visit("#/orgs");
    organizationPage.getOrganizationSearchBar().should("not.exist")
  });
});
