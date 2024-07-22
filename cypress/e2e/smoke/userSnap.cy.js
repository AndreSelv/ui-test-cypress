describe("User Snap persistence", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.viewport(size, orientation);
        });
        it("User snap is present", {}, () => {
          cy.visit("");
          cy.get("us-button").should("not.exist");
          cy.visit("/#/");
          cy.contains("Welcome").should("be.visible");
          cy.get("us-button").should("exist");
          cy.visit("/#/browse");
          cy.url().should('contain', 'browse');
          cy.get("us-button").should("exist");
          cy.visit("/#/faq");
          cy.contains("Frequently Asked Questions").should("be.visible");
          cy.get("us-button").should("exist");
          cy.visit("/#/orgs");
          // cy.contains("Organizations").should("be.visible");
          cy.get("us-button").should("exist");
          cy.visit("/#/users");
          // cy.contains("All Users").should("be.visible");
          cy.get("us-button").should("exist");
        });
      });
    });
  });
});

