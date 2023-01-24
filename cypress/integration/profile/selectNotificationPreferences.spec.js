// Because story US99853 these tests shouldn't work, it is recommended to delete them
describe("Access My Profile - Update Notification Preferences", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.visit("#/");
          cy.contains("JD").click();
          cy.contains("my Profile").click();

          cy.server();

          cy.route({
            method: "GET",
            url:
              "/users/*/notification-preferences?type=BULLETINS&line=*&state=*",
            response: [],
          });

          cy.contains("NOTIFICATION PREFERENCES").click();

          cy.viewport(size, orientation);
        });

        it("Select One State for Farm Inland Marine in Farm And Ag", () => {
          cy.contains("FARM AND AG").click();

          cy.get("[data-test=FIM]").should("contain", "(0/53)");

          cy.route({
            method: "POST",
            url: "/users/*/notification-preferences",
            response: [],
          });

          cy.get("[data-test=FIM]").click();
          cy.contains("Alaska").click();

          cy.get("[data-test=FIM]").should("contain", "(1/53)");
        });

        it("Select Two States for Homewoners Exempt in Personal Lines", () => {
          cy.contains("PERSONAL LINES").click();

          cy.get("[data-test=HOX]").should("contain", "(0/53)");

          cy.get("[data-test=HOX]").click();
          cy.contains("Illinois").click();

          cy.get("[data-test=HOX]").should("contain", "(1/53)");

          cy.contains("Virginia").click();

          cy.get("[data-test=HOX]").should("contain", "(2/53)");
        });

        it("Select All States for Commercial Crime in Commercial Lines", () => {
          cy.contains("COMMERCIAL LINES").click();

          cy.get("[data-test=CR]").should("contain", "(0/53)");

          cy.route({
            method: "GET",
            url:
              "/users/*/notification-preferences?type=BULLETINS&line=*&state=*",
            response: "fixture:orgs/org1/notificationPreferences.json",
          });

          cy.get("[data-test=CR]").contains("SELECT ALL").click();

          cy.get("[data-test=CR]").should("contain", "(53/53)");
        });
      });
    });
  });
});
