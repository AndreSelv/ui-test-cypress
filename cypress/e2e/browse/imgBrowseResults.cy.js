const MATERIALS = require("../../fixtures/enums/MATERIALS");
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
          // cy.intercept("POST", "/assets/v1/search", { fixture: "browse/noBrowseIMGResult.json" });
          cy.visit("#/browse");
          cy.get("#product-select").type("IMG - {downArrow}{enter}{esc}");
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectMU]").click().type("{esc}");
          // cy.get("#packageType-select").type("IMS{downArrow}{enter}{esc}");
          cy.get("[data-test=browseScreenSearch]").type("firee{enter}");
          cy.contains("0 results");
        });

        it("validate browse IMG search returns 1 result", () => {
          // cy.intercept("POST", "/assets/v1/search", { fixture: "browse/oneBrowseIMGResult.json" });
          cy.visit("#/browse");
          cy.get("#product-select").type("IMG - {downArrow}{enter}{esc}");
          // cy.get("#classes-select").type("Contractors' Equipment{downArrow}{enter}{esc}");
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectAZ]").click().type("{esc}");
          cy.get("[data-test=browseScreenSearch]").type("fire{enter}");
          cy.get(`span:contains("more")`).its("length").should("equal", 1);
        });

        it("validate browse IMG search returns more than 1 result", () => {
          // cy.intercept("POST", "/assets/v1/search", { fixture: "browse/manyBrowseIMGResults.json" });
          cy.visit("#/browse");
          cy.get("#product-select").type("IMG - {downArrow}{enter}{esc}");
          // cy.get("#classes-select").type("Contractors' Equipment{downArrow}{enter}{esc}");
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectAK]").click().type("{esc}");
          cy.get("[data-test=browseScreenSearch]").type("fire{enter}");
          cy.get(`span:contains("more")`).its("length").should("be.gte", 1);
        });

        it("validate browse IMG has classes", () => {
          // cy.intercept("POST", "/assets/v1/search", { fixture: "browse/manyBrowseIMGResults.json" });
          cy.visit("#/browse");
          cy.get("#product-select").type("IMG - {downArrow}{enter}{esc}");
          cy.get("#classes-select").should("be.visible");
        });

        it("validate browse IMG getting result with classes parameters", () => {
          cy.visit("#/browse");
          cy.get("#product-select").type("IMG - {downArrow}{enter}{esc}");
          cy.get("#classes-select").should("be.visible");
          cy.get("#classes-select").click();
          // cy.get(`#classes-select-option-0`).click()
          cy.contains("BCF").click();
          cy.get("#classes-select").click();
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectAL]").click().type("{esc}");
          cy.get(`span:contains("more")`).its("length").should("be.gte", 1);
        });
        it("Validate browse IMG getting result with each Material types", () => {
          cy.visit("#/browse");
          cy.get("#product-select").type("IMG - {downArrow}{enter}{esc}");
          cy.get("#classes-select").should("be.visible");
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectAL]").click().type("{esc}");
          for (let i = 0; i < MATERIALS.length; i++) {
            if (MATERIALS[i][0] === "Manual Materials") continue;
            cy.get("#packageType-select").click();
            cy.get(`input[type="checkbox"]`)
              .as("checkboxes").check([MATERIALS[i][0]], { force: true });
            cy.wrap(MATERIALS[i]).each((type) => {
              cy.get(`input[value="${type}"]`).should("be.checked").and("have.value", type);
              cy.get(`span:contains("more")`).its("length").should("be.gte", 1);
            });
            cy.get(`input[type="checkbox"]`)
              .as("checkboxes").uncheck([MATERIALS[i][0]], { force: true });
            cy.get("#packageType-select").click();
          }
        });
      });
    });
  });
});
