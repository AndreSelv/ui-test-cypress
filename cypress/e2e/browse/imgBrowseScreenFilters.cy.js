const BrowsePage = require("../../support/PageObjects/BrowsePage");
const browsePage = new BrowsePage();
describe("IMG Browse Screen: Filters", () => {

  beforeEach(() => {
    cy.initAmplify();
    cy.login();
  });
  it.skip("US74307 add IMG Product select one of the classes, select supporting documents (IMG) from the package types and select each document type", () => {
    cy.visit("#/browse");
    cy.get("#product-select").type("IMG{downArrow}{enter}{esc}");
    cy.get("#classes-select").type("Bailee{downArrow}{enter}{esc}");
    cy.get("#packageType-select").type("Supporting Documents (IMG){downArrow}{enter}{esc}");
    cy.get("#supporting-docs-type-autocomplete").type("CIN{downArrow}{enter}{esc}");
    cy.contains("CIN");
    cy.get("#supporting-docs-type-autocomplete").type("CSE{downArrow}{enter}{esc}");
    cy.contains("CSE");
    cy.get("#supporting-docs-type-autocomplete").type("CVC{downArrow}{enter}{esc}");
    cy.contains("CVC");
    cy.get("#supporting-docs-type-autocomplete").type("FIN{downArrow}{enter}{esc}");
    cy.contains("FIN");
    cy.get("#supporting-docs-type-autocomplete").type("GIN{downArrow}{enter}{esc}");
    cy.contains("GIN");
    cy.get("#supporting-docs-type-autocomplete").type("RTW{downArrow}{enter}{esc}");
    cy.contains("RTW");
    cy.get("#supporting-docs-type-autocomplete").type("UND{downArrow}{enter}{esc}");
    cy.contains("UND");
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
    browsePage.getProductRequestButton().click();
    browsePage.getAdditionalInfoButton().type("Test");
    browsePage.getSubmitModalRequestButton().should("be.enabled");
  });


  it("US4792 validate that user not be able submit request without fill out data in require field \"What we can do for you\"", () => {
    cy.visit("#/browse");
    browsePage.selectProduct("IMG");
    browsePage.selectClass("BCF");
    browsePage.selectState("MU");
    browsePage.selectMaterialType("Bulletins");
    browsePage.getProductRequestButton().click();
    browsePage.getSubmitModalRequestButton().should("be.disabled");
  });
});

