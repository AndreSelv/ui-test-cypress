const MATERIALS = require("../../fixtures/enums/MATERIALS");
const BrowsePage = require("../../support/PageObjects/BrowsePage");
const browsePage = new BrowsePage();
let x = Math.floor((Math.random() * 10) + 1);
describe("Browse Screen: Filters", () => {
  beforeEach(() => {
    cy.initAmplify();
    cy.login();

  });
  it("US73951 using browse add a product then return to none", () => {
    cy.visit("#/browse");
    browsePage.selectProduct("BOP");
    cy.contains("States*");//.click();
  });

  it("US73951 using browse add a state, then remove the state", () => {
    cy.visit("#/browse");
    browsePage.selectState("CA");
    browsePage.selectState("CA")
    cy.contains("States*").should("be.visible");
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
    browsePage.typeSearch("\"Water\"")
    cy.wait(500)
    browsePage.getListOfPublicationsCards().each(($el)=>{
      expect($el.text()).contains("BP")
    })
  });

  it("US115255 Alphabetize product lines within More tile dropdown", () => {
    cy.visit("#/browse");
    browsePage.selectProduct("AGXL");
    browsePage.selectState("AL");
    browsePage.getMoreButton(x).click();
    browsePage.getListOfProductLinesInCard().then($elements => {
      const strings = [...$elements].map(el => el.innerText);
      const sortedLines = strings.sort((a, b) => {
        if (a.toLowerCase() > b.toLowerCase()) return 1;
        else if (a.toLowerCase() < b.toLowerCase()) return -1;
        return 0;
      });
      expect(strings).to.deep.equal(sortedLines);
    });
  });

  it("US115255 Alphabetize states within More tile dropdown", () => {
    cy.visit("#/browse");
    browsePage.selectProduct("AGXL");
    browsePage.selectState("AL");
    browsePage.getMoreButton(x).click();

    browsePage.getListOfStatesInCard().then($elements => {
      const strings = [...$elements].map(el => el.innerText);
      expect(strings).to.deep.equal([...strings].sort());
    });
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

