const MATERIALS = require("../../fixtures/enums/MATERIALS");
describe("Search Functionality", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });
        it("enter a product in the search box and vailidate information returns", () => {
          // cy.intercept("POST", "/assets/v1/search", { fixture: "browse/browseResultsVariousCards.json" });
          cy.visit("/#");
          cy.get("[data-test=navBarSearch]").type("Liability{enter}");
          cy.get("#product-select").type("AGXL{downArrow}{enter}{esc}");
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectMU]").click().type("{esc}");
          cy.get("#packageType-select").click();
          cy.get(`input[type="checkbox"]`)
            .as("checkboxes").check('Forms', { force: true });
          cy.contains("Liability");
        });
      });
    });
  });
});
