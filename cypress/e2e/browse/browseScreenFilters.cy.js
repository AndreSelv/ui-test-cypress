const MATERIALS = require("../../fixtures/enums/MATERIALS");
const BrowsePage = require("../../support/PageObjects/BrowsePage");
const browsePage = new BrowsePage();
describe("Browse Screen: Filters", () => {
  beforeEach(() => {
    cy.initAmplify();
    cy.login();

  });
  it("US73951 using browse add a product then return to none", () => {
    cy.visit("#/browse");
    browsePage.selectProduct("BOP");
    cy.contains("No state added").click();
  });

  it("US73951 using browse add a state, then remove the state", () => {
    cy.visit("#/browse");
    browsePage.selectState("CA");
    browsePage.deleteStateFromFilter("CA").click();
    cy.contains("No state added").should("be.visible");
  });

  it("US73951 using browse add a product, a state and each of the package types", () => {
    cy.visit("#/browse");
    browsePage.selectProduct("AGXL");
    browsePage.selectState("MU");

    for (let i = 1; i < MATERIALS.length; i++) {
      const cat = MATERIALS[i][0];
      browsePage.selectMaterialType(cat);
      cy.contains(cat);
      browsePage.getMaterialTypeSection().should("contain.text", cat);
      browsePage.unSelectMaterialType(cat);
    }
  });

  it("US73951 using browse add a product, state, package type, both status options", () => {
    cy.visit("#/browse");
    browsePage.selectProduct("BOP");
    browsePage.selectState("MU");
    browsePage.selectMaterialType("Forms");
  });

  it("US73951 using browse add a product, state, package type, stats and then enter a product in the search box and validate information returns", () => {
    cy.visit("#/browse");
    browsePage.selectProduct("BOP");
    browsePage.selectState("AL");
    browsePage.selectMaterialType("Forms");
    browsePage.typeSearch("Fire")
    browsePage.getListOfPublicationsCards().each(($el)=>{
      expect($el.text()).contains("Fire")
    })
  });

  it.skip("US73951 using browse add a product, state package type of SUP and validate the Document Types", () => {
    cy.visit("#/browse");

    cy.get("#product-select").type("BOP{downArrow}{enter}{esc}");
    cy.get("[data-test=addState]").click();
    cy.get("[data-test=selectMU]").click().type("{esc}");
    cy.get("#packageType-select").type("Supporting Documents{downArrow}{enter}{esc}");

    cy.get("#supporting-docs-type-autocomplete").type("ADV{downArrow}{enter}{esc}", { delay: 50 });
    cy.get(".MuiGrid-spacing-xs-3 > :nth-child(4)").should("contain", "ADV");
    cy.get("#supporting-docs-type-autocomplete").type("COL{downArrow}{enter}{esc}", { delay: 50 });
    cy.get(".MuiGrid-spacing-xs-3 > :nth-child(4)").should("contain", "COL");
    cy.get("#supporting-docs-type-autocomplete").type("SBS{downArrow}{enter}{esc}", { delay: 50 });
    cy.get(".MuiGrid-spacing-xs-3 > :nth-child(4)").should("contain", "SBS");
    cy.get("#supporting-docs-type-autocomplete").type("MAP{downArrow}{enter}{esc}", { delay: 50 });
    cy.get(".MuiGrid-spacing-xs-3 > :nth-child(4)").should("contain", "MAP");
    cy.get("#supporting-docs-type-autocomplete").type("RTX{downArrow}{enter}{esc}", { delay: 50 });
    cy.get(".MuiGrid-spacing-xs-3 > :nth-child(4)").should("contain", "RTX");
    cy.get("#supporting-docs-type-autocomplete").type("REP{downArrow}{enter}{esc}", { delay: 50 });
    cy.get(".MuiGrid-spacing-xs-3 > :nth-child(4)").should("contain", "Status Reports");
  });
});

