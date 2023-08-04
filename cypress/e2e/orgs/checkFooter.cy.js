const HomePage = require("../../support/PageObjects/HomePage");
const homePage = new HomePage();
describe("Check Links in the Footer", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });

        it("Check the 'Contact' Link", () => {
          cy.visit("/#");

          // TODO: Add data-test = footer
          homePage.getFooterContactLink().should(
            "have.attr",
            "href",
            "mailto:membership@aaisonline.com"
          );
        });

        it("Check the Current Date", () => {
          cy.visit("/#");

          cy.contains(new Date().getFullYear());
        });

        it("Check the 'Legal' Link", () => {
          cy.visit("/#");

          homePage.getFooterLegalLink().should(
            "have.attr",
            "href",
            "https://www.aaisonline.com/en/terms-of-use"
          );
        });

        it("Check the 'AAISonline' Link", () => {
          cy.visit("/#");

          homePage.getFooterAAISOnlineLink().should(
            "have.attr",
            "href",
            "https://www.aaisonline.com"
          );
        });
      });
    });
  });
});
