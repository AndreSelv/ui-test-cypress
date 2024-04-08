const HomePage = require("../../support/PageObjects/HomePage");
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
        it.skip("US77611 validate statistical reporting card on main screen", () => {
          cy.visit("#");
          cy.contains("Statistical Reporting (BETA)").click();
          cy.contains("GT2 Buckets");
        });

        it("Validate that Statistical Report link persist on the home page", () => {
          cy.visit("/#");
          homePage.getStatisticalReporting().should(
            "have.attr",
            "href",
            "#/data",
          );
        });

        it.skip("Validate that Wildfire Resource Center link persist on the home page", () => {
          cy.visit("/#");
          homePage.getWildLifeRecourseCenter().should(
            "have.attr",
            "href",
            "#/risk",
          );
        });
      });
    });
  });
});
