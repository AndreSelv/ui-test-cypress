const BrowsePage = require("../../support/PageObjects/BrowsePage");
const HomePage = require("../../support/PageObjects/HomePage");
const browsePage = new BrowsePage();
const homePage = new HomePage();
describe("Home screen: Browse All Products card", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });
        it("US73951 validate browse all products card on the main screen", () => {
          cy.visit("#");
          homePage.getBrowseAllAAISProductsLink().click();
          browsePage.getBrowseSearchResultSection().should("be.visible");
        });
      });
    });
  });
});
