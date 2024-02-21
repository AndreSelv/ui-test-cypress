// The commented code responds to story US99853
const HomePage = require("../../support/PageObjects/HomePage");
const homePage = new HomePage();
describe("Check Avatar Menus for Non Employee", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
          cy.fixture("orgs/org1/myUser.json").then((user) => {
            cy.intercept("GET", `/users/${Cypress.env("USER")}`, user).as("getEmail");
          });
          cy.visit("/#");
          cy.get("[data-test=navBarAvatar]").click();
          cy.viewport(size, orientation);
        });

        it("Check Notification Link doe not exist", () => {
          homePage.getNavBarMenu()
            .should("not.have.attr", "href", "#/notifications");
        });

        it("Check My Profile Link", () => {
          homePage.getNavBarMenu();
          cy.contains("My Profile")
            .should(
              "have.attr",
              "href",
              `#/users/06e9ac1b-fd4c-41b9-9b2c-779aa720fd0a`,
            );
        });

        it("Check Orgs Link", () => {
          homePage.getNavBarMenu()
            .contains("Orgs")
            .should("have.attr", "href", "#/orgs");
        });

        it("Check Sign Out Link", () => {
          homePage.getNavBarMenu()
            .contains("Sign Out").click();
          cy.contains("Sign in");
        });

        it("Check Hide Links", () => {
          homePage.getNavBarMenu()
            .should("not.contain", "Employees");

          homePage.getNavBarMenu()
            .should("not.contain", "All Users");
        });
      });
    });
  });
});
