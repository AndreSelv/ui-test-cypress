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
          cy.contains("Risk Awareness Service");
          cy.contains("See More").click();
        });
      });
    });
  });
});
