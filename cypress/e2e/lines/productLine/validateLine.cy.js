describe("Validate Product Line", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });

        it("Product Line Description is shown correctly", () => {
          cy.visit("#/lines/BOP");
          cy.get("[data-test=expandMore]").click();
          cy.get("[data-test=lineDescription]").contains(/./);
        });
        it("Product Line Title is shown correctly", () => {
          cy.visit("#/lines/BOP");
          cy.get("[data-test=titlebar]").contains(/./);
        });
      });
    });
  });
});
