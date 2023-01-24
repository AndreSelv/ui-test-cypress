describe("Search Functionality", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });
        it("enter a product in the search box and vailidate information returns", () => {
          cy.visit("#");
          cy.get("[data-test=navBarSearch]").type("BOP{enter}");
          cy.contains("status");
        });
      });
    });
  });
});
