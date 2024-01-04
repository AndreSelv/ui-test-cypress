const HomePage = require("../../support/PageObjects/HomePage");
const BrowsePage = require("../../support/PageObjects/BrowsePage");
const homePage = new HomePage();
const browsePage = new BrowsePage();
const TESTS = require("../../fixtures/enums/TESTS");
describe("Search Functionality", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.visit("/#/browse");
          cy.viewport(size, orientation);
        });

        it("US114519 Accommodate form and bulletin searches more intelligently", () => {

          cy.wrap(TESTS).each((test) => {
            browsePage.getSearchField().clear();
            browsePage.typeSearch(test.case);
            cy.wait(700);
            // cy.url().should("contain", "/#/browse");
            // browsePage.getExcludeFileContentCheckBox().click();
            browsePage.publicationsShouldBeEqual(test.result);
            browsePage.getListOfPublicationsCards().each(($el) => {
              expect($el.text()).contains(test.expect);
            });

            browsePage.getSearchField().clear();
            browsePage.typeSearch(test.caseQuotes);
            browsePage.publicationsShouldBeEqual(test.result);
            browsePage.getListOfPublicationsCards().each(($el) => {
              expect($el.text()).contains(test.expect);
            });
          });
        });
      });
    });
  });
});
