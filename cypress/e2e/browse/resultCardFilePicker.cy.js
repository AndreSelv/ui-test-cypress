const BrowsePage = require("../../support/PageObjects/BrowsePage");
const browsePage = new BrowsePage();
describe("Browse Result Card File Piker", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.viewport(size, orientation);
        });

        it("validate that user can select various doc types of if  search card contains it", () => {
          cy.visit("#/browse");
          browsePage.selectProduct("HO");
          browsePage.selectState("AL");
          browsePage.typeSearch("Fire");
          browsePage.getListOfPublicationsCards()
        });
      });
    });
  });
});
