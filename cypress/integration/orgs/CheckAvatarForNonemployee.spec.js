// The commented code responds to story US99853

describe("Check Avatar Menus for Non Employee", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.server();

          cy.route({
            method: "GET",
            url: "/users/659a5e72-01c2-41dc-b962-e797b25d1636",
            response: "fixture:orgs/org1/user.json",
          });

          cy.visit("/#");
          cy.get("[data-test=navBarAvatar]").click();

          cy.viewport(size, orientation);
        });

        // it("Check Notification Link", () => {
        //   cy.get("[data-test=navBarMenu]")
        //     .contains("Notifications")
        //     .should("have.attr", "href", "#/notifications");
        // });

        it("Check My Profile Link", () => {
          cy.get("[data-test=navBarMenu]")
            .contains("My Profile")
            .should(
              "have.attr",
              "href",
              "#/users/659a5e72-01c2-41dc-b962-e797b25d1636"
            );
        });

        it("Check Orgs Link", () => {
          cy.get("[data-test=navBarMenu]")
            .contains("Orgs")
            .should("have.attr", "href", "#/orgs");
        });

        it("Check Sign Out Link", () => {
          cy.get("[data-test=navBarMenu]").contains("Sign Out").click();

          cy.contains("No account? Create account");
          cy.contains("SIGN IN");
        });

        it("Check Hide Links", () => {
          cy.get("[data-test=navBarMenu]").should("not.contain", "Employees");

          cy.get("[data-test=navBarMenu]").should("not.contain", "All Users");
        });
      });
    });
  });
});
