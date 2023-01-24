describe("User Snap persistence", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.viewport(size, orientation);
        });
        it("User snap is present", {},() => {
          cy.visit("");
          cy.get('us-button').should('not.exist');
          cy.visit("/#/");
          cy.get('us-button').should('exist');
          cy.visit("/#/browse");
          cy.get('us-button').should('exist');
          cy.visit("/#/search");
          cy.get('us-button').should('exist');
          cy.visit("/#/orgs");
          cy.get('us-button').should('exist');
          cy.visit("/#/users");
          cy.get('us-button').should('exist');
        });
      });
    });
  });
});

