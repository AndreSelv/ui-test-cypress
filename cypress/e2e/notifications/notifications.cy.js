describe("Test for notifications", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });
        it("No unread notifications", () => {
          cy.server();

          cy.route({
            method: "GET",
            url:
              "/v1/users/dd32f8d3-5c80-4169-accb-394ca7c514c5/notifications?read=false",
            response: [],
          });

          cy.visit("#/notifications");
        });

        it("Three unread notifications", () => {
          cy.server();

          cy.route({
            method: "GET",
            url: "/v1/users/*/notifications?read=false",
            response: "fixture:notifications/multipleUnreadMessages.json",
          });

          cy.visit("#/notifications");
          cy.contains("Actions").click();
          cy.contains("toggle select all").click();
        });

        it("One unread notification", () => {
          cy.server();

          cy.route({
            method: "GET",
            url: "/v1/users/*/notifications?read=false",
            response: "fixture:notifications/oneUnreadMessages.json",
          });

          cy.visit("#/notifications");
          cy.contains("Actions").click();
          cy.contains("toggle select all").click();
        });
      });
    });
  });
});
