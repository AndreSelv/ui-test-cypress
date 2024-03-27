const HomePage = require("../../support/PageObjects/HomePage");
const homePage = new HomePage();
describe("Check Links in the Header", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.visit("/#");

          cy.viewport(size, orientation);
        });

        it("Check AAIS Logo", () => {
          homePage.getAAISLogo().should("be.visible");
        });
      });
    });
  });
});
