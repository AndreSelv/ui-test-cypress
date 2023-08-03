const MATERIALS = require("../../fixtures/enums/MATERIALS");
const HomePage = require("../../support/PageObjects/HomePage");
const BrowsePage = require("../../support/PageObjects/BrowsePage");
const homePage = new HomePage();
const browsePage = new BrowsePage();
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
          homePage.typeSearchBar("Liability");
          cy.url().should("contain", "/#/browse");
          browsePage.selectProduct("AGXL");
          browsePage.selectState("MU");
          browsePage.selectMaterialType("Forms");
          browsePage.getListOfPublicationsCards().each(($el) => {
            expect($el.text()).contains("Liability");
          });
        });
      });
    });
  });
});
