describe("Login and Logout", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.viewport(size, orientation);
        });

        it("successful login", () => {
          cy.visit("#/lines/BOP");
          cy.get("[data-test=username-input]").type(
            Cypress.env("USERNAME")
          );
          cy.get("[data-test=sign-in-password-input]").type(
            Cypress.env("PASSWORD")
          );
          cy.get("button").contains("SIGN IN").click();
          cy.contains("businessowners");
        });
        it("successful logout", () => {
          cy.visit("#/lines/BOP");
          cy.get("[data-test=username-input]").type(
            Cypress.env("USERNAME")
          );
          cy.get("[data-test=sign-in-password-input]").type(
            Cypress.env("PASSWORD")
          );

          cy.get("button").contains("SIGN IN").click();
          cy.get("[data-test=navBarAvatar]").click();
          cy.contains("Sign Out").click();
          cy.contains("Sign In");
        });
      });
    });
  });
});
