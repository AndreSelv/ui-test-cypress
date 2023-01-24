describe("Home screen: Risk awareness card", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });
        it("validate risk awareness maps card on the main screen", () => {
          cy.visit("#");
          cy.contains("Wildfire Resource Center").should("be.visible");
          cy.get('.MuiGrid-grid-md-4 > .MuiGrid-root > .MuiCard-root > .MuiCardContent-root > .MuiPaper-root > .MuiTypography-h5 > .MuiTypography-root').click();
          cy.url().should("contain","/#/risk")
        });
      });
    });
  });
});
