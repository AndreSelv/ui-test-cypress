describe("Risk Awareness page", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });
        it("validate card1 is visible and clickable", () => {
          cy.visit("#/risk");
          cy.url().should("eq", Cypress.config().baseUrl + "/#/risk");
          cy.contains("AAIS Catastrophe Planning");
          cy.contains("OPEN");
        });
        it("validate card2 is visible and clickable", () => {
          cy.visit("#/risk");
          cy.url().should("eq", Cypress.config().baseUrl + "/#/risk");
          cy.contains("AAIS Hurricane Live Event Tracker");
          cy.contains("OPEN");
        });
      });
    });
  });
});
