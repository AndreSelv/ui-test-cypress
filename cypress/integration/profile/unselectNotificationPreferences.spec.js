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
            response: "fixture:orgs/org1/notificationPreferences.json",
          });

          cy.contains("NOTIFICATION PREFERENCES").click();

          cy.viewport(size, orientation);
        });

        it("Unselect One State for Farm Inland Marine in Farm And Ag", () => {
          cy.contains("FARM AND AG").click();

          cy.get("[data-test=FIM]").should("contain", "(1/53)");

          cy.route({
            method: "DELETE",
            url: "/users/*/notification-preferences",
            response: [],
          });

          cy.get("[data-test=FIM]").click();
          cy.contains("Alaska").click();

          cy.get("[data-test=FIM]").should("contain", "(0/53)");
        });

        it("Unselect Two States for AGXL in Farm And Ag", () => {
          cy.contains("FARM AND AG").click();

          cy.get("[data-test=AGXL]").should("contain", "(2/53)");

          cy.route({
            method: "DELETE",
            url: "/users/*/notification-preferences",
            response: [],
          });

          cy.get("[data-test=AGXL]").click();
          cy.contains("Alaska").click();

          cy.get("[data-test=AGXL]").should("contain", "(1/53)");

          cy.contains("Iowa").click();

          cy.get("[data-test=AGXL]").should("contain", "(0/53)");
        });

        it("Unselect All States for CR in Commercial Lines", () => {
          cy.contains("COMMERCIAL LINES").click();

          cy.get("[data-test=CR]").should("contain", "(53/53)");

          cy.route({
            method: "DELETE",
            url: "/users/*/notification-preferences",
            response: [],
          });

          cy.fixture("orgs/org1/notificationPreferences").then(
            (notificationPreferences) => {
              notificationPreferences.splice(0, 1);

              cy.route(
                "GET",
                "/users/*/notification-preferences?type=BULLETINS&line=CR&state=*",
                notificationPreferences
              );
            }
          );

          cy.contains("UNSELECT ALL").click();

          cy.get("[data-test=CR]").should("contain", "(0/53)");
        });
      });
    });
  });
});
