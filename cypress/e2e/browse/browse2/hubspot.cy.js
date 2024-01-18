const BrowsePage = require("../../../support/PageObjects/BrowsePage");
const browsePage = new BrowsePage();
describe("Validate User Interface Hubspot functionalities", () => {
  beforeEach(() => {
    cy.initAmplify();
    cy.login();
    cy.visit("#/browse");
  });

  it("Validate positive request to Hubspot with all required data ", () => {
    browsePage.selectProduct("IMG");
    browsePage.selectClass("BCF");
    browsePage.selectState("CA");
    browsePage.selectMaterialType("Forms", "IMG Publications");
    browsePage.typeSearch("Fire");
    //Select effective date
    browsePage.setFromDateField("10/02/2012");

    browsePage.getRequestHelpButton().click({ force: true });
    cy.wait(1000);
    browsePage.getAdditionalInfoButton().type("Some Information", { force: true });
    browsePage.getSubmitModalRequestButton().click({ force: true });
    browsePage.getAlertDialogDescription().should("include.text", "Your request was submitted. One of our product managers will contact you soon.");
    browsePage.getKeepBrowsingProductButton().click();
  });

  it("Validate required field for submitting hubspot form", () => {
    browsePage.getBrowseSearchResultSection().should("contain.text", "REQUEST HELP");
    browsePage.getRequestHelpButton().should("be.enabled");
  });

  it("Validate negative scenario of submitting form ", () => {
    browsePage.getRequestHelpButton().click({ force: true });
    cy.wait(1000);
    browsePage.getSubmitModalRequestButton().should("be.disabled");
    browsePage.getAdditionalInfoButton().type("Some Information", { delay: 150});
    browsePage.getSubmitModalRequestButton().should("be.enabled");
  });

});
