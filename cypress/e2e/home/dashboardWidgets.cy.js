const BrowsePage = require("../../support/PageObjects/BrowsePage");
const HomePage = require("../../support/PageObjects/HomePage");
const browsePage = new BrowsePage();
const homePage = new HomePage();
describe("US121943 Upgraded Dashboard testing Widgets", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.viewport(size, orientation);
          cy.visit("#");
        });

        it("Widgets availability", () => {
          homePage.getBrowseWidgets().should("be.visible");
          homePage.getNewlyAvailableWidgets().should("be.visible");
          homePage.getRecentDownloadWidgets().should("be.visible");
        });
        it("Browse Widgets functionality", () => {
          homePage.getBrowseWidgets().should("be.visible").contains("Search All AAIS Products").click();
          cy.url().should('contain', 'browse')
        });
      });
    });
  });
});
