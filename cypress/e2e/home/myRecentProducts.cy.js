const HomePage = require("../../support/PageObjects/HomePage");
const homePage = new HomePage();
describe("My Recent Products", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      xdescribe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });
        it("validate no recent products", () => {
          cy.visit("#");
          homePage.getMyRecentProductsSection().should("be.visible");
        });
        it("validate my one recent product", () => {
          cy.intercept("POST", "/assets/v1/search", { fixture: "recentProducts/oneRecentProduct.json" });
          cy.visit("#");
          homePage.getMyRecentProductsSection().should("be.visible");
        });

        it("validate my two recent products", () => {
          cy.intercept("POST", "/assets/v1/search", { fixture: "recentProducts/twoRecentProduct.json" });
          cy.visit("#");
          homePage.getMyRecentProductsSection().should("be.visible")
        });

        it("validate only 5 products are visable even though six are sent from the server", () => {
          cy.intercept("POST", "/assets/v1/search", { fixture: "recentProducts/sixRecentProduct.json" });
          cy.visit("#");
          homePage.getMyRecentProductsSection().should("be.visible")
        });
      });
    });
  });
});
