describe("IMG Browse Screen: Filters", () => {
  //   Cypress.env("SIZES").forEach((size) => { // FIXME: - need conditional formating for size and orientation to work
  //     Cypress.env("ORIENTATION").forEach((orientation) => {
  //       describe(`Device: ${size}, Orientation: ${orientation}`, () => {
  beforeEach(() => {
    cy.initAmplify();
    cy.login();

    //        cy.viewport(size, orientation);
  });
  it("US74307 add IMG Product select one of the classes, select supporting documents (IMG) from the package types and select each document type", () => {
    cy.visit("#/browse");

    cy.get("[data-test=browseProduct]").click();
    cy.get('[data-value="IMG"]').click();

    cy.get("[data-test=classes]").click();
    cy.get('[data-value="BCF"]').click();

    cy.get("[data-test=packageType]").click();
    cy.get('[data-value="IMS"]').click();

    cy.get("[data-test=browseFilter-item-supportingDocsType]").click();
    cy.contains("none").click();
    cy.get("[data-test=browseFilter-item-supportingDocsType]").click();
    cy.get('[data-value="CLASS_INFORMATION"]').click();
    cy.get("[data-test=browseFilter-item-supportingDocsType]").click();
    cy.get('[data-value="COMPATIBLE_SCHEDULES_AND_ENDORSEMENTS"]').click();
    cy.get("[data-test=browseFilter-item-supportingDocsType]").click();
    cy.get('[data-value="COVERAGE_COMMENTARY"]').click();
    cy.get("[data-test=browseFilter-item-supportingDocsType]").click();
    cy.get('[data-value="FILING_INFORMATION"]').click();
    cy.get("[data-test=browseFilter-item-supportingDocsType]").click();
    cy.get('[data-value="GENERAL_INFORMATION"]').click();
    cy.get("[data-test=browseFilter-item-supportingDocsType]").click();
    cy.get('[data-value="RATING_WORKSHEETS"]').click();
    cy.get("[data-test=browseFilter-item-supportingDocsType]").click();
    cy.get('[data-value="UNDERWRITING"]').click();
  });

  it("US74307 using browse add IMG, add a class, state, package type, status and enter something in search box", () => {
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
  });
});
//     });
//   });
// });
