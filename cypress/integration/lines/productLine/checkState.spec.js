describe("Check State", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });

        it("US65528 Select Multistate (MU)", () => {
          cy.visit("#/lines/BOP");
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectMU").click();
        });

        it("US65598 Remove State", () => {
          cy.visit("#/lines/BOP");
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectMU").click();
          cy.get("[data-test=chipMU] > .MuiChip-deleteIcon").click();
          cy.contains("No state added");
        });

        it("US65598 Select Multiple States", () => {
          cy.visit("#/lines/BOP");
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectMU").click();
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectFL").click();
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectGA").click();
        });
      });
    });
  });
});
