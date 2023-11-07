const MATERIALS = require("../../fixtures/enums/MATERIALS");
const BrowsePage = require("../../support/PageObjects/BrowsePage");
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
          browsePage.typeSearch("firee");
          browsePage.selectState("MU");
          cy.contains("0 results");
        });

        it("validate browse IMG search returns 1 result", () => {
          // cy.intercept("POST", "/assets/v1/search", { fixture: "browse/oneBrowseIMGResult.json" });
          cy.visit("#/browse");
          browsePage.selectProduct("AGXL");
          browsePage.selectMaterialType("General Bulletin")
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
            if (MATERIALS[i][0] === "Manual Materials") continue;
            browsePage.getMaterial().click();
            browsePage.getAllCheckBox()
              .as("checkboxes").check([MATERIALS[i][0]], { force: true });
            cy.wrap(MATERIALS[i]).each((type) => {
              cy.get(`input[value="${type}"]`).should("be.checked").and("have.value", type);
              browsePage.publicationsShouldBeGreaterThen(1);
            });
            browsePage.getAllCheckBox()
              .as("checkboxes").uncheck([MATERIALS[i][0]], { force: true });
            browsePage.getMaterial().click();
          }
        });
      });
    });
  });
});
