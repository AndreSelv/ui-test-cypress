// The commented code responds to story US99853
const HomePage = require("../../support/PageObjects/HomePage");
const homePage = new HomePage();
describe("Check Avatar Menus for Non Employee", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login(Cypress.env("USERNAME1"), Cypress.env("PASSWORD"));
          cy.visit("/#");
          homePage.getNavBarMenu().click();
        });
        const time = 1000;
        it("Check Notification Link doe not exist", () => {
          homePage.getNavBarMenu()
            .should("not.have.attr", "href", "#/notifications");
        });

        it("Check My Profile Link", () => {
          cy.wait(time);
          cy.contains("My Profile").click({ force: true });
          cy.url().should("include", `#/users/${Cypress.env("USER1")}`);
        });

        it("Check Organizations Link", () => {
          cy.wait(time);
          cy.contains("My Organizations").click({ force: true });
          cy.url().should("include", `#/orgs`);
        });

        it("Check Admin Link", () => {
          cy.wait(time);
          cy.visit("/#/admin");
          cy.url().should("include", `#/403`);
          cy.contains("Error code 403: Page is forbidden")
        });

        it("Check Sign Out Link", () => {
          cy.wait(time);
          cy.contains("Sign Out").click({ force: true });
          cy.url().should("include", `/#`);
          cy.get("button").contains("Sign in").should("be.visible");
        });

        it("Check FAQ Links", () => {
          cy.wait(time);
          cy.contains("FAQ").click({ force: true });
          cy.url().should("include", `#/faq`);
        });

        it.skip("Check Hide Links", () => {
          homePage.getNavBarMenu()
            .should("not.contain", "Employees");

          homePage.getNavBarMenu()
            .should("not.contain", "All Users");
        });
      });
    });
  });
});
