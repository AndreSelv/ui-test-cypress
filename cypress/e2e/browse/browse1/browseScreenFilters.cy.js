const MATERIALS = require("../../../fixtures/enums/MATERIALS");
const BrowsePage = require("../../../support/PageObjects/BrowsePage");
const browsePage = new BrowsePage();
const HomePage = require("../../../support/PageObjects/HomePage");
const homePage = new HomePage();
describe("Browse Screen: Filters", () => {
  beforeEach(() => {
    cy.initAmplify();
    cy.login();

  });
  it("US73951 using browse add a product then return to none", () => {
    cy.visit("#/browse");
    browsePage.selectProduct("BOP");
    cy.contains("Jurisdiction");//.click();
  });

  it("US73951 using browse add a state, then remove the state", () => {
    cy.visit("#/browse");
    browsePage.selectState("CA");
    browsePage.selectState("CA")
    cy.contains("Jurisdiction").should("be.visible");
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
    browsePage.selectMaterialType("Forms");
    browsePage.selectProduct("BOP");
    browsePage.typeSearch("\"Water\"")
    browsePage.selectState("AL");
    cy.wait(500)
    browsePage.getListOfPublicationsCards().each(($el)=>{
      expect($el.text()).contains("BP")
    })
  });

  it.only("US116672 Validate search by title only functionality", () => {
    cy.visit("#/browse");
    browsePage.typeSearch(`"NV Supplement"`);
    browsePage.selectProduct("AGGL");
    browsePage.getExcludeFileContentCheckBox().click()
    // browsePage.selectAllStates();
    cy.contains(`10 results`);
    browsePage.getExcludeFileContentCheckBox().click();
    cy.contains(`2 results`);
  });

  it.only("US116672 Validate search by title only functionality from Quick search", () => {
    cy.visit("#/browse");
    browsePage.typeSearch(`"NV Supplement"`);
    cy.contains(`4 results`);
    browsePage.getExcludeFileContentCheckBox().click();
    cy.contains(`12 results`);
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

