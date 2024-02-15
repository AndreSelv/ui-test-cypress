const LinesPage = require("../../../support/PageObjects/LinesPage");
const linesPage = new LinesPage();
describe("Validate Product Line", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.viewport(size, orientation);
        });

        it("Product Line Description is shown correctly", () => {
          cy.visit("#/lines/BOP");
          linesPage.getExpendMoreButton().click();
          linesPage.getLineDescription().contains(/./);
        });
        it("Product Line Title is shown correctly", () => {
          cy.visit("#/lines/BOP");
          linesPage.getTitleBar().contains(/./);
        });

        it(`US120178 Verify that screen elements on "Downloads" screen hided`, (product = "HO") => {
          cy.visit(`#/lines/${product}`);
          linesPage.getTitleBar().contains(/./);
          cy.contains("Recent Changes").should("not.exist");
          cy.contains(`Download Latest ${product} Program Materials`).should("not.exist");
          cy.contains(`Download Latest ${product} Files List (.csv)`).should("not.exist");
          cy.contains(`My Recent ${product} Downloads`).should("be.visible");
        });
      });
    });
  });
});
