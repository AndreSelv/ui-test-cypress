const HomePage = require("../../support/PageObjects/HomePage");
const homePage = new HomePage();
describe("Home screen: Risk awareness card", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });
        it.skip("validate risk awareness maps card on the main screen", () => {
          cy.visit("#");
          homePage.getWildLifeRecourseCenter().should("be.visible").click();
          cy.url().should("contain","/#/risk")
        });
      });
    });
  });
});
