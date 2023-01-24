describe("Downloading Product Materials", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });
        it("Product Materials are succesfully downlaoded", () => {
          cy.visit("#/lines/BOP");
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectCO").click();
          cy.get("[data-test=downloadLatest]");
        });
      });
    });
  });
});
