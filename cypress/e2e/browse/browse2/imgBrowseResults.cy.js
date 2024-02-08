const MATERIALS = require("../../../fixtures/enums/MATERIALS");
const BrowsePage = require("../../../support/PageObjects/BrowsePage");
const browsePage = new BrowsePage();
describe("Brows Results Summary", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.viewport(size, orientation);
        });

        it("validate no browse IMG search results", () => {
          // cy.intercept("POST", "/assets/v1/search", { fixture: "browse/noBrowseIMGResult.json" });
          cy.visit("#/browse");
          browsePage.selectProduct("IMG");
          browsePage.typeSearch("fireee");
          browsePage.selectState("MU");
          cy.contains("0 results");
        });

        it("validate browse IMG search returns 1 result", () => {
          // cy.intercept("POST", "/assets/v1/search", { fixture: "browse/oneBrowseIMGResult.json" });
          cy.visit("#/browse");
          browsePage.selectProduct("AGXL");
          browsePage.selectMaterialType("Bulletins");
          browsePage.selectMaterialSubType("General Bulletin");
          browsePage.selectState("PA");
          // browsePage.typeSearch("fire");
          browsePage.publicationsShouldBeEqual(1);
        });

        it("validate browse IMG search returns more than 1 result", () => {
          // cy.intercept("POST", "/assets/v1/search", { fixture: "browse/manyBrowseIMGResults.json" });
          cy.visit("#/browse");
          browsePage.selectProduct("AGXL");
          browsePage.selectState("AK");
          browsePage.typeSearch("fire");
          browsePage.publicationsShouldBeGreaterThen(1);
        });

        it("validate browse IMG has classes", () => {
          // cy.intercept("POST", "/assets/v1/search", { fixture: "browse/manyBrowseIMGResults.json" });
          cy.visit("#/browse");
          browsePage.selectProduct("IMG");
          browsePage.getClasses().should("be.visible");
        });

        it("validate browse IMG getting result with classes parameters", () => {
          cy.visit("#/browse");
          browsePage.selectProduct("IMG");
          browsePage.selectClass("BCF");
          browsePage.selectState("AL");
          browsePage.publicationsShouldBeGreaterThen(1);
        });
        it("Validate browse IMG getting result with each Material types", () => {
          cy.visit("#/browse");
          browsePage.selectProduct("IMG");
          browsePage.selectState("AL");
          for (let i = 0; i < MATERIALS.length; i++) {
            if (MATERIALS[i][0] === "Statistical Plans" || MATERIALS[i][0] === "Compliance Guide" || MATERIALS[i][0] === "Forms") continue;
            browsePage.selectMaterialType(MATERIALS[i][0]);
            for (let j = 1; j < MATERIALS[i].length; j++) {
              let type = MATERIALS[i][j];
              // cy.get(`input[value="${type}"]`).should("not.be.checked").and("have.value", type);
              browsePage.selectMaterialSubType(type);
              browsePage.getMaterialTypeSubSection().should("contain", type)
              browsePage.unSelectMaterialSubType(type);
            }
            browsePage.unSelectMaterialType(MATERIALS[i][0]);
          }
        });
      });
    });
  });
});
