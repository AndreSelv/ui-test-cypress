describe("Check Links in the Header", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.visit("/#");

          cy.viewport(size, orientation);
        });

        it("Check AAIS Logo", () => {
          cy.get("[data-test=AAISlogo]").should("have.attr", "href", "#/");
        });

        it("Check Search Text Box is Visible ", () => {
          cy.get("[data-test=navBarSearch]").should("be.visible");
        });

        it("Check Search Screen", () => {
          cy.get("[data-test=navBarSearch]").type("{enter}");

          cy.url().should("include", "/#/search?sid=");

          cy.contains("STATUS");
          cy.contains("TYPE");
          cy.contains("PRODUCTS");
        });
      });
    });
  });
});
