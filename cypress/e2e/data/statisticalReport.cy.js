describe("Statistical Report", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });

        it("Validate that Statistical Report link persist on the home page", () => {
          cy.visit("/#");
          cy.contains("Statistical Reporting (BETA)").should(
            "have.attr",
            "href",
            "#/data",
          );
        });

        it("Validate that Wildfire Resource Center link persist on the home page", () => {
          cy.visit("/#");
          cy.contains("Wildfire Resource Center").should(
            "have.attr",
            "href",
            "#/risk",
          );
        });
      });
    });
  });
});
