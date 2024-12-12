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
          homePage.getSearchAllAAISProductsLink().click();
          browsePage.getBrowseSearchResultSection().should("be.visible");
        });

        it("US73951 validate the browse auto lines", () => {
          cy.visit("#");
          homePage.getBrowseAutoLinesLink().click();
          homePage.getLandingPageBar().should("contain.text", "Auto")
        });

        it("US73951 validate the browse commercial lines", () => {
          cy.visit("#");
          homePage.getBrowseCommercialLinesLink().click();
          homePage.getLandingPageBar().should("contain.text", "Commercial")
        });

        it("US73951 validate the browse Farm and Ag lines", () => {
          cy.visit("#");
          homePage.getBrowseFarmAgLinesLink().click();
          homePage.getLandingPageBar().should("contain.text", "Farm & Ag")
        });

        it("US73951 validate the browse inland marine lines", () => {
          cy.visit("#");
          homePage.getBrowseInlandMarineLinesLink().click();
          homePage.getLandingPageBar().should("contain.text", "Inland Marine")
        });

        it("US73951 validate the personal lines", () => {
          cy.visit("#");
          homePage.getBrowsePersonalLinesLink().click();
          homePage.getLandingPageBar().should("contain.text", "Personal")
        });
      });
    });
  });
});
