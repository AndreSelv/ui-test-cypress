describe("Compare with Production", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });

        it.skip("US63611: Compare with Production", () => {
          cy.visit("#/utils/livraria");
          cy.get("[data-test=compareWithProd]").click();
        });
      });
    });
  });
});
