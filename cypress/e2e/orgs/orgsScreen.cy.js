describe("Check that orgs are shown", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.bootStrapOrg1();

          cy.viewport(size, orientation);
        });

        it("Show zero org", () => {

          cy.intercept("GET", "/orgs");

          cy.visit("#/orgs/");
        });

        it("Show one org", () => {
          cy.visit("#/orgs/");

          cy.contains("Test Org 1");
        });

        it("Show two orgs", () => {
          cy.intercept("GET", "/orgs", { fixture: "orgs/two-orgs.json" });
          cy.visit("#/orgs/");
          cy.contains("Test Org 1");
          cy.contains("Test Org 2");
        });
      });
    });
  });
});
