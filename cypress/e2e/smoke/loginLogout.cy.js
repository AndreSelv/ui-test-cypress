describe("Login and Logout", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.viewport(size, orientation);
        });

        it("successful login Admin role", () => {
          cy.visit("#/");
          cy.get("#amplify-id-\\:r1\\:").type(
            Cypress.env("USERNAME"),
          );
          cy.get("#amplify-id-\\:r4\\:").type(
            Cypress.env("PASSWORD"),
          );
          cy.get("button").contains("Sign in").click();
          cy.get("[data-test=\"AAISlogo\"]").should("be.visible");
          cy.get("span").contains("Sign Out").click();
          cy.get("button").contains("Sign in").should("be.visible");
        });


        it("successful login User role", () => {
          cy.visit("#/");
          cy.get("#amplify-id-\\:r1\\:").type(
            Cypress.env("USERNAME1"),
          );
          cy.get("#amplify-id-\\:r4\\:").type(
            Cypress.env("PASSWORD"),
          );
          cy.get("button").contains("Sign in").click();
          cy.get("[data-test=\"AAISlogo\"]").should("be.visible");
          cy.get("span").contains("Sign Out").click();
          cy.get("button").contains("Sign in").should("be.visible");
        });

      });
    });
  });
});
