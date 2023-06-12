describe("Login and Logout", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.viewport(size, orientation);
        });

        it("successful login", () => {
          cy.visit("#/lines/BOP");
          cy.get("#amplify-id-\\:r1\\:").type(
            Cypress.env("USERNAME")
          );
          cy.get("#amplify-id-\\:r4\\:").type(
            Cypress.env("PASSWORD")
          );
          cy.get("button").contains("Sign in").click();
          cy.contains('Incorrect username or password.').should('not.be.visible')
          // cy.get('[data-test="AAISlogo"]').should("be.visible");
        });
        it("successful logout", () => {
          cy.visit("#/lines/BOP");
          cy.get("#amplify-id-\\:r1\\:").type(
            Cypress.env("USERNAME")
          );
          cy.get("#amplify-id-\\:r4\\:").type(
            Cypress.env("PASSWORD")
          );

          cy.get("button").contains("Sign in").click();
          // cy.contains("Log Out").click();
          // cy.contains("SIGN IN");
        });
      });
    });
  });
});
