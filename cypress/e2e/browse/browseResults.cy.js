describe("Brows Results Summary", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });

        it("validate no browse each results", () => {
          cy.intercept("POST", "/assets/v1/search", { fixture: "browse/noBrowseResult.json" });
          cy.visit("#/browse");
          cy.get("#product-select").type("YT{downArrow}{enter}{esc}");
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectCO]").click().type("{esc}");
          cy.get("#packageType-select").type("Loss Cost{downArrow}{enter}{esc}");
          cy.get("[data-test=browseScreenSearch]").type("water{enter}");
          cy.contains("0 results");
        });

        it("validate browse search returns 1 result", () => {
          cy.intercept("POST", "/assets/v1/search", { fixture: "browse/oneBrowseResult.json" });
          cy.visit("#/browse");
          cy.get("#product-select").type("YT{downArrow}{enter}{esc}");
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectMU]").click().type("{esc}");
          cy.get("#packageType-select").type("Rules{downArrow}{enter}{esc}");
          cy.get("[data-test=browseScreenSearch]").type("water{enter}");
          cy.contains("1 results");
        });

        it("validate browse search returns more than 1 result", () => {
          cy.intercept("POST", "/assets/v1/search", { fixture: "browse/manyBrowseResults.json" });
          cy.visit("#/browse");
          cy.get("#product-select").type("YT{downArrow}{enter}{esc}");
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectCO]").click().type("{esc}");
          cy.get("#packageType-select").type("Forms{downArrow}{enter}{esc}");
          cy.get("[data-test=browseScreenSearch]").type("IMG{enter}");
          cy.contains("33 results");
        });

        it("validate download button functionality", () => {
          cy.intercept("POST", "/assets/v1/search", { fixture: "browse/oneBrowseResult.json" });
          cy.visit("#/browse");
          cy.get("#product-select").type("AGXL{downArrow}{enter}{esc}", { delay: 50 });
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectMU]").click().type("{esc}");
          cy.contains("1 results");
          // cy.task("deleteFolder", Cypress.config("downloadsFolder"));
          cy.get("[data-test=\"browseScreen-item-download-button\"]").click();
          cy.get('.MuiDialogActions-root > .MuiButton-textPrimary').click();
          cy.contains("Downloading Content").should("be.visible");

          // cy.contains('Downloading Content').should("not.be.visible");
          // cy.task('countFiles', 'cypress/downloads').then((count) => {
          //   expect(count).eqls(1);
          // })

        });

        it("validate that effective date is persist on the search filter", () => {
          cy.intercept("POST", "/assets/v1/search", { fixture: "browse/oneBrowseResult.json" });
          cy.visit("#/browse");
          cy.contains("Effective Date").should("be.visible");
          cy.get(":nth-child(1) > .MuiInputBase-root > .MuiButtonBase-root").click({force: true});
          cy.get(".MuiCalendarPicker-root").should("be.visible");
          cy.get(":nth-child(1) > .MuiInputBase-root > .MuiButtonBase-root").click( {force: true});
          cy.get(".MuiCalendarPicker-root").should("be.not.visible");
        });

        it("validate that oldest effective date is persist on the search filter", () => {
          cy.intercept("POST", "/assets/v1/search", { fixture: "browse/oneBrowseResult.json" });
          cy.visit("#/browse");
          cy.contains("Oldest Date").should("be.visible");
          cy.get(":nth-child(2) > .MuiInputBase-root > .MuiButtonBase-root").click({force: true});
          cy.get(".MuiCalendarPicker-root").should("be.visible");
          cy.get(":nth-child(2) > .MuiInputBase-root > .MuiButtonBase-root").click( {force: true});
          cy.get(".MuiCalendarPicker-root").should("be.not.visible");
        });
      });
    });
  });
});
