describe("Brows Results Summary", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });

        it("validate no browse earch results", () => {
          cy.server();

          cy.route({
            method: "POST",
            url: "/assets/v1/search",
            response: "fixture:browse/noBrowseResult.json",
          });

          cy.visit("#/browse");
          cy.get("[data-test=browseProduct]").click();
          cy.get('[data-value="YT"]').click();

          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectCO]").click();

          cy.get("[data-test=packageType]").click();
          cy.get('[data-value="PLC"]').click();

          cy.get("[data-test=status]").click();
          cy.get('[data-value="Externally Approved"]').click();

          cy.get("[data-test=browseScreenSearch]").type("water{enter}");
          cy.contains("0 results");
        });

        it("validate browse search returns 1 result", () => {
          cy.server();

          cy.route({
            method: "POST",
            url: "/assets/v1/search",
            response: "fixture:browse/oneBrowseResult.json",
          });

          cy.visit("#/browse");
          cy.get("[data-test=browseProduct]").click();
          cy.get('[data-value="YT"]').click();

          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectMU]").click();

          cy.get("[data-test=packageType]").click();
          cy.get('[data-value="PRL"]').click();

          cy.get("[data-test=status]").click();
          cy.get('[data-value="Externally Approved"]').click();

          cy.get("[data-test=browseScreenSearch]").type("water{enter}");
          cy.contains("1 results");
        });

        it("validate browse search returns more than 1 result", () => {
          cy.server();

          cy.route({
            method: "POST",
            url: "/assets/v1/search",
            response: "fixture:browse/manyBrowseResults.json",
          });

          cy.visit("#/browse");
          cy.get("[data-test=browseProduct]").click();
          cy.get('[data-value="HOBP"]').click();

          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectMU]").click();

          cy.get("[data-test=packageType]").click();
          cy.get('[data-value="PFM"]').click();

          cy.get("[data-test=status]").click();
          cy.get('[data-value="Externally Approved"]').click();

          cy.get("[data-test=browseScreenSearch]").type("IMG{enter}");
          cy.contains("33 results");
        });
      });
    });
  });
});
