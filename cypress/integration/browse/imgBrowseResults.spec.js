describe("Brows Results Summary", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });

        it("validate no browse IMG search results", () => {
          cy.server();

          cy.route({
            method: "POST",
            url: "/assets/v1/search",
            response: "fixture:browse/noBrowseIMGResult.json",
          });

          cy.visit("#/browse");
          cy.get("[data-test=browseProduct]").click();
          cy.get('[data-value="IMG"]').click();

          cy.get("[data-test=classes]").click();
          cy.get('[data-value="BCF"]').click();

          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectMU]").click();

          cy.get("[data-test=packageType]").click();
          cy.get('[data-value="IMS"]').click();

          cy.get("[data-test=status]").click();
          cy.get('[data-value="Externally Approved"]').click();

          cy.get("[data-test=browseScreenSearch]").type("fire{enter}");
          cy.contains("0 results");
        });

        it("validate browse IMG search returns 1 result", () => {
          cy.server();

          cy.route({
            method: "POST",
            url: "/assets/v1/search",
            response: "fixture:browse/oneBrowseIMGResult.json",
          });

          cy.visit("#/browse");
          cy.get("[data-test=browseProduct]").click();
          cy.get('[data-value="IMG"]').click();

          cy.get("[data-test=classes]").click();
          cy.get('[data-value="CE"]').click();

          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectMU]").click();

          cy.get("[data-test=packageType]").click();
          cy.get('[data-value="PRL"]').click();

          cy.get("[data-test=status]").click();
          cy.get('[data-value="Externally Approved"]').click();

          cy.get("[data-test=browseScreenSearch]").type("IMG{enter}");
          cy.contains("1 results");
        });

        it("validate browse IMG search returns more than 1 result", () => {
          cy.server();

          cy.route({
            method: "POST",
            url: "/assets/v1/search",
            response: "fixture:browse/manyBrowseIMGResults.json",
          });

          cy.visit("#/browse");
          cy.get("[data-test=browseProduct]").click();
          cy.get('[data-value="IMG"]').click();

          cy.get("[data-test=classes]").click();
          cy.get('[data-value="CE"]').click();

          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectMU]").click();
          cy.get("[data-test=selectCA]").click();

          cy.get("[data-test=packageType]").click();
          cy.get('[data-value="PLC"]').click();

          cy.get("[data-test=status]").click();
          cy.get('[data-value="Externally Approved"]').click();

          cy.get("[data-test=browseScreenSearch]").type("IMG{enter}");
          cy.contains("3 results");
        });
      });
    });
  });
});
