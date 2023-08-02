const BrowsePage = require("../../support/PageObjects/BrowsePage");
const browsePage = new BrowsePage();
describe("Validate User Interface Hubspot functionalities", () => {
  beforeEach(() => {
    cy.initAmplify();
    cy.login();
  });

  it("Validate positive request to Hubspot with all required data ", () => {
    cy.visit("#/browse");
    browsePage.selectProduct("IMG");
    browsePage.selectClass("BCF");
    browsePage.selectState("CA");
    browsePage.selectMaterialType(["Forms", "IMG Publications"]);
    browsePage.typeSearch("Fire");

    //Select effective date
    browsePage.getEffectiveDateField().click({ force: true });
    cy.get(":nth-child(5) > :nth-child(4) > .MuiButtonBase-root").dblclick({ force: true });
    browsePage.getProductRequestButton().click({ force: true });
    cy.wait(1000);
    browsePage.getWhatWeCanDoForYouButton().type("Some Information", { force: true });
    browsePage.getSubmitModalRequestButton().click({ force: true });
    browsePage.getAlertDialogDescription().should("include.text", "Your request was submitted. One of our product managers will contact you soon.");
    browsePage.getKeepBrowsingProductButton().click();
  });

  it("Validate required field for submitting hubspot form", () => {
    cy.visit("#/browse");
    browsePage.getBrowseSearchResultSection().should("not.contain.text", "Not what you were looking for?");
    browsePage.selectProduct("IMG");
    browsePage.getBrowseSearchResultSection().should("not.contain.text", "Not what you were looking for?");
    browsePage.selectClass("BCF");
    browsePage.getBrowseSearchResultSection().should("not.contain.text", "Not what you were looking for?");
    browsePage.selectState("CA");
    browsePage.getBrowseSearchResultSection().should("contain.text", "Not what you were looking for?");
    browsePage.getProductRequestButton().should("be.visible").click();
    browsePage.getWhatWeCanDoForYouButton().type("Test");
    browsePage.getSubmitModalRequestButton().should("be.enabled").click();
    browsePage.getAlertDialogDescription().should("include.text", "Your request was submitted. One of our product managers will contact you soon.");
    browsePage.getKeepBrowsingProductButton().click();
  });

  it("Validate negative scenario of submitting form ", () => {
    cy.visit("#/browse");
    browsePage.getBrowseSearchResultSection().should("not.contain.text", "Not what you were looking for?");
    browsePage.selectProduct("AGGL");
    browsePage.getBrowseSearchResultSection().should("not.contain.text", "Not what you were looking for?");
    browsePage.selectMaterialType(["Forms", "IMG Publications"]);
    browsePage.getBrowseSearchResultSection().should("not.contain.text", "Not what you were looking for?");
    browsePage.typeSearch("Fire");    //Select effective date
    browsePage.getEffectiveDateField().click({ force: true });
    cy.get(":nth-child(5) > :nth-child(4) > .MuiButtonBase-root").dblclick({ force: true });
    browsePage.getBrowseSearchResultSection().should("not.contain.text", "Not what you were looking for?");
  });

});
