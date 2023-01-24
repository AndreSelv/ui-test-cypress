describe("Search Functionality", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });
        it("enter a product in the search box and vailidate information returns", () => {
          cy.server();

          cy.route({
            method: "POST",
            url: "/assets/v1/search",
            response: "fixture:browse/browseResultsVariousCards.json",
          });

          cy.visit("#");
          cy.get("[data-test=navBarSearch]").type("Terrorism{enter}");
          cy.get("#product-select").type("AGXL{downArrow}{enter}{esc}");
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectMU]").click().type("{esc}");
          cy.contains("Terrorism");
        });
      });
    });
  });
});
