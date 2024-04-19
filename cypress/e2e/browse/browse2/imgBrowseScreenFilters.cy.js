const BrowsePage = require("../../../support/PageObjects/BrowsePage");
const browsePage = new BrowsePage();
describe("IMG Browse Screen: Filters", () => {

  beforeEach(() => {
    cy.initAmplify();
    cy.login();
  });

  it("US74307 using browse add IMG, add a class, state, package type, status and enter something in search box", () => {
    cy.visit("#/browse");
    browsePage.selectProduct("IMG");
    browsePage.selectClass("BCF");
    browsePage.selectState("MU");
    browsePage.typeSearch("fire");
  });

  it("US4790 validate that user be able to submit request with all field populated", () => {
    cy.visit("#/browse");
    browsePage.selectProduct("IMG");
    browsePage.selectClass("BCF");
    browsePage.selectState("MU");
    browsePage.selectMaterialType("Bulletins");
    browsePage.typeSearch("fire");
    browsePage.getRequestHelpButton().click({force:true});
    browsePage.getAdditionalInfoButton().type("Test");
    browsePage.getSubmitModalRequestButton().should("be.enabled");
  });


  it("US4792 validate that user not be able submit request without fill out data in require field \"What we can do for you\"", () => {
    cy.visit("#/browse");
    browsePage.selectProduct("IMG");
    browsePage.selectClass("BCF");
    browsePage.selectState("MU");
    browsePage.selectMaterialType("Bulletins");
    browsePage.getRequestHelpButton().click({force:true});
    browsePage.getSubmitModalRequestButton().should("be.disabled");
  });
});

