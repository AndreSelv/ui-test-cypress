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
          cy.intercept("POST", "/assets/v1/search", { fixture: "browse/noBrowseIMGResult.json" });
          cy.visit("#/browse");
          cy.get("#product-select").type("IMG{downArrow}{enter}{esc}");
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectMU]").click().type("{esc}");
          cy.get("#packageType-select").type("IMS{downArrow}{enter}{esc}");
          cy.get("[data-test=browseScreenSearch]").type("fire{enter}");
          cy.contains("0 results");
        });

        it("validate browse IMG search returns 1 result", () => {
          cy.intercept("POST", "/assets/v1/search", { fixture: "browse/oneBrowseIMGResult.json" });
          cy.visit("#/browse");
          cy.get("#product-select").type("IMG{downArrow}{enter}{esc}");
          cy.get("#classes-select").type("Contractors' Equipment{downArrow}{enter}{esc}");
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectMU]").click().type("{esc}");
          cy.get("#packageType-select").type("Rules{downArrow}{enter}{esc}");
          cy.get("[data-test=browseScreenSearch]").type("IMG{enter}");
          cy.contains("1 results");
        });

        it("validate browse IMG search returns more than 1 result", () => {
          cy.intercept("POST", "/assets/v1/search", { fixture: "browse/manyBrowseIMGResults.json" });
          cy.visit("#/browse");
          cy.get("#product-select").type("IMG{downArrow}{enter}{esc}");
          cy.get("#classes-select").type("Contractors' Equipment{downArrow}{enter}{esc}");
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectMU]").click();
          cy.get("[data-test=selectCA]").click().type("{esc}");
          cy.get("#packageType-select").type("Loss cost{downArrow}{enter}{esc}");
          cy.get("[data-test=browseScreenSearch]").type("IMG{enter}");
          cy.contains("3 results");
        });
      });
    });
  });
});
