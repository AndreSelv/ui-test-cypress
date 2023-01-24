describe("Browse Screen: Filters", () => {
  //   Cypress.env("SIZES").forEach((size) => { // FIXME: - need conditional formating for size and orientation to work
  //     Cypress.env("ORIENTATION").forEach((orientation) => {
  //       describe(`Device: ${size}, Orientation: ${orientation}`, () => {
  beforeEach(() => {
    cy.initAmplify();
    cy.login();

    //        cy.viewport(size, orientation);
  });
  it("US73951 using browse add a product then return to none", () => {
    cy.visit("#/browse");
    cy.get("[data-test=browseProduct]").click();
    cy.get('[data-value="BOP"]').click();
    cy.get("[data-test=browseProduct]").click();
    cy.contains("none").click();
  });

  it("US73951 using browse add a state, then remove the state", () => {
    cy.visit("#/browse");
    cy.get("[data-test=addState]").click();
    cy.get("[data-test=selectMU]").click();
    cy.get("[data-test=chipMU] > .MuiChip-deleteIcon").click();
    cy.contains("no state added");
  });

  it("US73951 using browse add a product, a state and each of the package types", () => {
    cy.visit("#/browse");

    cy.get("[data-test=browseProduct]").click();
    cy.get('[data-value="BOP"]').click();

    cy.get("[data-test=addState]").click();
    cy.get("[data-test=selectMU]").click();

    cy.get("[data-test=packageType]").click();
    cy.get('[data-value="PFM"]').click();
    cy.get("[data-test=packageType]").click();
    cy.get('[data-value="PLC"]').click();
    cy.get("[data-test=packageType]").click();
    cy.get('[data-value="PRL"]').click();
    cy.get("[data-test=packageType]").click();
    cy.get('[data-value="PRI"]').click();
    cy.get("[data-test=packageType]").click();
    cy.get('[data-value="SUP"]').click();
    cy.get("[data-test=packageType]").click();
    cy.contains("none").click();
  });

  it("US73951 using browse add a product, state, package type, both status options", () => {
    cy.visit("#/browse");
    cy.get("[data-test=browseProduct]").click();
    cy.get('[data-value="BOP"]').click();

    cy.get("[data-test=addState]").click();
    cy.get("[data-test=selectMU]").click();

    cy.get("[data-test=packageType]").click();
    cy.get('[data-value="PFM"]').click();

    cy.get("[data-test=status]").click();
    cy.get('[data-value="Superseded"]').click();
    cy.get("[data-test=status]").click();
    cy.get('[data-value="Externally Approved"]').click();
  });

  it("US73951 using browse add a product, state, package type, stats and then enter a product in the search box and vailidate information returns", () => {
    cy.visit("#/browse");
    cy.get("[data-test=browseProduct]").click();
    cy.get('[data-value="BOP"]').click();

    cy.get("[data-test=addState]").click();
    cy.get("[data-test=selectMU]").click();

    cy.get("[data-test=packageType]").click();
    cy.get('[data-value="PFM"]').click();

    cy.get("[data-test=status]").click();
    cy.get('[data-value="Externally Approved"]').click();

    cy.get("[data-test=browseScreenSearch]").type("fire{enter}");
    cy.contains("fire");
  });

  it("US73951 using browse add a product, state package type of SUP and validate the Document Types", () => {
    cy.visit("#/browse");

    cy.get("[data-test=browseProduct]").click();
    cy.get('[data-value="BOP"]').click();

    cy.get("[data-test=addState]").click();
    cy.get("[data-test=selectMU]").click();

    cy.get("[data-test=packageType]").click();
    cy.get('[data-value="SUP"]').click();

    cy.get("[data-test=browseFilter-item-supportingDocsType]").click();
    cy.get('[data-value="ADVISORY_INFO"]').click();
    cy.get("[data-test=browseFilter-item-supportingDocsType]").click();
    cy.get('[data-value="CAUSE_OF_LOSS_REPORT"]').click();
    cy.get("[data-test=browseFilter-item-supportingDocsType]").click();
    cy.get('[data-value="SIDE_BY_SIDE"]').click();
    cy.get("[data-test=browseFilter-item-supportingDocsType]").click();
    cy.get('[data-value="HEAT_MAPS"]').click();
    cy.get("[data-test=browseFilter-item-supportingDocsType]").click();
    cy.get('[data-value="RATING_EXAMPLES"]').click();
    cy.get("[data-test=browseFilter-item-supportingDocsType]").click();
    cy.get('[data-value="STATUS_REPORTS"]').click();
    cy.get("[data-test=browseFilter-item-supportingDocsType]").click();
    cy.contains("None").click();
  });
});
//     });
//   });
// });
