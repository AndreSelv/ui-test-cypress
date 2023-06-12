const MATERIALS = require("../../fixtures/enums/MATERIALS");
describe("Browse Screen: Filters", () => {
  beforeEach(() => {
    cy.initAmplify();
    cy.login();

  });
  it("US73951 using browse add a product then return to none", () => {
    cy.visit("#/browse");
    cy.get("#product-select").type("BOP{downArrow}{enter}{esc}");
    cy.contains("No state added").click();
  });

  it("US73951 using browse add a state, then remove the state", () => {
    cy.visit("#/browse");
    cy.get("[data-test=addState]").click();
    cy.get("[data-test=selectMU]").click().type("{esc}");
    cy.get("[data-test=chipMU] > .MuiChip-deleteIcon").click();
    cy.contains("No state added").should("be.visible");
  });

  it.only("US73951 using browse add a product, a state and each of the package types", () => {
    cy.visit("#/browse");

    cy.get("#product-select").type("AGXL{downArrow}{enter}{esc}");
    cy.get("[data-test=addState]").click();
    cy.get("[data-test=selectMU]").click().type("{esc}");

    cy.get("#packageType-select").type("Form{downArrow}{enter}");
    cy.get(`input[type="checkbox"]`)
      .as("checkboxes").check("Forms", { force: true });
    cy.contains("Forms");
    cy.get('[data-test="packageType"] > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment').click()

    cy.get("#packageType-select").type("Advisory Information{downArrow}{enter}");
    cy.get(`input[type="checkbox"]`)
      .as("checkboxes").check("Advisory Information", { force: true });
    cy.contains("Advisory Information");
    cy.get('[data-test="packageType"] > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment').click()

    cy.get("#packageType-select").type("Bulletins{downArrow}{enter}");
    cy.get(`input[type="checkbox"]`)
      .as("checkboxes").check("Bulletins", { force: true });
    cy.contains("Bulletins");
    cy.get('[data-test="packageType"] > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment').click()

    cy.get("#packageType-select").type("Compliance Guide{downArrow}{enter}");
    cy.get(`input[type="checkbox"]`)
      .as("checkboxes").check("Compliance Guide", { force: true });
    cy.contains("Compliance Guide");
    cy.get('[data-test="packageType"] > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment').click()

    cy.get("#packageType-select").type("Education Materials{downArrow}{enter}");
    cy.get(`input[type="checkbox"]`)
      .as("checkboxes").check("Education Materials", { force: true });
    cy.contains("Education Materials");
    cy.get('[data-test="packageType"] > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment').click()

    cy.get("#packageType-select").type("Forms and Endorsements Lists{downArrow}{enter}");
    cy.get(`input[type="checkbox"]`)
      .as("checkboxes").check("Forms and Endorsements Lists", { force: true });
    cy.contains("Forms and Endorsements Lists");
    cy.get("#packageType-select").click();
    cy.get('[data-test="packageType"] > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment').click()
  });

  it("US73951 using browse add a product, state, package type, both status options", () => {
    cy.visit("#/browse");

    cy.get("#product-select").type("BOP{downArrow}{enter}{esc}");
    cy.get("[data-test=addState]").click();
    cy.get("[data-test=selectMU]").click().type("{esc}");
    cy.get("#packageType-select").type("Forms{downArrow}{enter}{esc}");

  });

  it("US73951 using browse add a product, state, package type, stats and then enter a product in the search box and validate information returns", () => {
    cy.intercept("POST", "/assets/v1/search", { fixture: "search/manyResults.json" });
    cy.visit("#/browse");
    cy.get("#product-select").type("BOP{downArrow}{enter}{esc}");
    cy.get("[data-test=addState]").click();
    cy.get("[data-test=selectMU]").click().type("{esc}");
    cy.get("#packageType-select").type("Forms{downArrow}{enter}{esc}");
    cy.get("[data-test=browseScreenSearch]").type("fire{enter}");
    cy.contains("fire");
  });

  it.skip("US73951 using browse add a product, state package type of SUP and validate the Document Types", () => {
    cy.visit("#/browse");

    cy.get("#product-select").type("BOP{downArrow}{enter}{esc}");
    cy.get("[data-test=addState]").click();
    cy.get("[data-test=selectMU]").click().type("{esc}");
    cy.get("#packageType-select").type("Supporting Documents{downArrow}{enter}{esc}");

    cy.get("#supporting-docs-type-autocomplete").type("ADV{downArrow}{enter}{esc}", { delay: 50 });
    cy.get(".MuiGrid-spacing-xs-3 > :nth-child(4)").should("contain", "ADV");
    cy.get("#supporting-docs-type-autocomplete").type("COL{downArrow}{enter}{esc}", { delay: 50 });
    cy.get(".MuiGrid-spacing-xs-3 > :nth-child(4)").should("contain", "COL");
    cy.get("#supporting-docs-type-autocomplete").type("SBS{downArrow}{enter}{esc}", { delay: 50 });
    cy.get(".MuiGrid-spacing-xs-3 > :nth-child(4)").should("contain", "SBS");
    cy.get("#supporting-docs-type-autocomplete").type("MAP{downArrow}{enter}{esc}", { delay: 50 });
    cy.get(".MuiGrid-spacing-xs-3 > :nth-child(4)").should("contain", "MAP");
    cy.get("#supporting-docs-type-autocomplete").type("RTX{downArrow}{enter}{esc}", { delay: 50 });
    cy.get(".MuiGrid-spacing-xs-3 > :nth-child(4)").should("contain", "RTX");
    cy.get("#supporting-docs-type-autocomplete").type("REP{downArrow}{enter}{esc}", { delay: 50 });
    cy.get(".MuiGrid-spacing-xs-3 > :nth-child(4)").should("contain", "Status Reports");
  });
});

