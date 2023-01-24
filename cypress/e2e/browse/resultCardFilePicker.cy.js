describe.only("Browse Result Card File Piker", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });

        it.only("validate that user can select various doc types of if  search card contains it", () => {

          cy.visit("#/browse");
          cy.get("#product-select").type("HO {downArrow}{enter}{esc}");
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectFL]").click().type("{esc}");
          cy.get("[data-test=browseScreenSearch]").type("OPTIONAL FARM COVERAGES{enter}");
          // cy.contains("Custom Farm Work").click();
          // cy.get("[role=radiogroup]").should('be.');
        });
      });
    });
  });
});
