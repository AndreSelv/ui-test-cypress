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
          homePage.getAAISLogo().should("have.attr", "href", "#/");
        });

        it("Check Search Text Box is Visible ", () => {
          homePage.getNavBarSearch().should("be.visible");
        });

        it("Check Search Screen", () => {
          homePage.getNavBarSearch().type("fire{enter}");

          cy.url().should("include", "/#/browse?q=fire");

        });
      });
    });
  });
});
