describe("Home screen: Browse All Products card", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });
        it("US73951 validate browse all products card on the main screen", () => {
          cy.visit("#");
          cy.contains("Browse All AAIS Products").click();
          cy.get('.MuiGrid-grid-md-3').should("be.visible");
        });
      });
    });
  });
});
