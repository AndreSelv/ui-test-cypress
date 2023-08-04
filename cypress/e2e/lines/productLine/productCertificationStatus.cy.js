const LinesPage = require("../../../support/PageObjects/LinesPage");
const linesPage = new LinesPage();
describe("Validate Product Certification Status", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });
        it.only("Product Line Certification is showing correctly", () => {
          cy.visit("#/lines/YT");
          linesPage.getStatus().contains(/./);
        });
      });
    });
  });
});
