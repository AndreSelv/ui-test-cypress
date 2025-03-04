// The commented code responds to story US99853
const HomePage = require("../../support/PageObjects/HomePage");
const homePage = new HomePage();
describe("Check Avatar Menus for Employee", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          // cy.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
          // cy.fixture("orgs/org1/myUser.json").then((user) => {
          //   user.email = "vasilich85@aaisonline.com";
          //   cy.intercept("GET", `/users/${Cypress.env("USER")}`, user).as("getEmail");
          // });
          cy.visit("/#");
          cy.get("[data-test=navBarAvatar]").click();
          cy.viewport(size, orientation);
        })
        ;
        const time = 1500;
        it("Check Notification Link does not exist", () => {
          homePage.getNavBarMenu()
            .should("not.have.attr", "href", "#/notifications");
        });

        it("Check My Profile Link", () => {
          cy.wait(time);
          cy.contains("My Profile").click({ force: true });
          cy.url().should("include", `#/users/${Cypress.env("USER")}`);
        });

        it("Check Organizations Link", () => {
          cy.wait(time);
          cy.contains("My Organizations").click({ force: true });
          cy.url().should("include", `#/orgs`);
        });

        it("Check Employee Links", () => {
          cy.wait(time);
          cy.contains("Employee").click({ force: true });
          cy.url().should("include", `#/employee`);
        });

        it("Check FAQ Links", () => {
          cy.wait(time);
          cy.contains("FAQ").click({ force: true });
          cy.url().should("include", `#/faq`);
        });

        it("Check All User Link", () => {
          cy.wait(time);
          cy.contains("All Users").click({ force: true });
          cy.url().should("include", `#/users`);
        });

        it("Check Admin Link", () => {
          cy.wait(time);
          cy.contains("Admin").click({ force: true });
          cy.url().should("include", `#/admin`);
        });

        it("Check Sign Out Link", () => {
          cy.wait(time);
          cy.contains("Sign Out").click({ force: true });
          cy.url().should("include", `/#`);
          cy.get("button").contains("Sign in").should("be.visible");
        });
      });
    });
  });
});
