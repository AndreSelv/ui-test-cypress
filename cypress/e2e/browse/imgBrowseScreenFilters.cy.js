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

    cy.get("#product-select").type("IMG{downArrow}{enter}{esc}");
    cy.get('#classes-select').type("Bailee{downArrow}{enter}{esc}");
    cy.get("#packageType-select").type("Supporting Documents (IMG){downArrow}{enter}{esc}");

    cy.get("#supporting-docs-type-autocomplete").type("CIN{downArrow}{enter}{esc}");
    cy.contains('CIN')
    cy.get("#supporting-docs-type-autocomplete").type("CSE{downArrow}{enter}{esc}");
    cy.contains('CSE')
    cy.get("#supporting-docs-type-autocomplete").type("CVC{downArrow}{enter}{esc}");
    cy.contains('CVC')
    cy.get("#supporting-docs-type-autocomplete").type("FIN{downArrow}{enter}{esc}");
    cy.contains('FIN')
    cy.get("#supporting-docs-type-autocomplete").type("GIN{downArrow}{enter}{esc}");
    cy.contains('GIN')
    cy.get("#supporting-docs-type-autocomplete").type("RTW{downArrow}{enter}{esc}")
    cy.contains('RTW')
    cy.get("#supporting-docs-type-autocomplete").type("UND{downArrow}{enter}{esc}");
    cy.contains('UND')

  });

  it("US74307 using browse add IMG, add a class, state, package type, status and enter something in search box", () => {
    cy.visit("#/browse");

    cy.get("#product-select").type("IMG{downArrow}{enter}{esc}");
    cy.get('#classes-select').type("Bailee{downArrow}{enter}{esc}");
    cy.get("[data-test=addState]").click();
    cy.get("[data-test=selectMU]").click().type("{esc}");
    cy.get("#packageType-select").type("Supporting Documents (IMG){downArrow}{enter}{esc}");

    cy.get("[data-test=browseScreenSearch]").type("fire{enter}");
  });

  it("US4790 validate that user be able to submit request with all field populated", () => {
    cy.visit("#/browse");

    cy.get("#product-select").type("IMG{downArrow}{enter}{esc}");
    cy.get('#classes-select').type("Bailee{downArrow}{enter}{esc}");
    cy.get("[data-test=addState]").click();
    cy.get("[data-test=selectMU]").click().type("{esc}");
    cy.get("#packageType-select").type("Bulletins{downArrow}{enter}{esc}");


    cy.get("[data-test=\"browseScreen-item-product-request-button\"] > .MuiButton-label").click();
    cy.get('[data-test="request-modal-searched-terms"] > .MuiInputBase-root > .MuiInputBase-input').type("Test")
    cy.get('[data-test="request-modal-additional-info"] > .MuiInputBase-root > .MuiInputBase-input').type("Test")
    cy.get("[data-test=\"submit-modal-request\"]").should("be.enabled");
  });

  it("US4791 validate that user not be able submit request without fill out data in require field \"Searched Terms\"", () => {
    cy.visit("#/browse");
    cy.get("#product-select").type("IMG{downArrow}{enter}{esc}");
    cy.get('#classes-select').type("Bailee{downArrow}{enter}{esc}");
    cy.get("[data-test=addState]").click();
    cy.get("[data-test=selectMU]").click().type("{esc}");
    cy.get("#packageType-select").type("Bulletins{downArrow}{enter}{esc}");

    cy.get("[data-test=\"browseScreen-item-product-request-button\"] > .MuiButton-label").click();
    cy.get('[data-test="request-modal-additional-info"] > .MuiInputBase-root > .MuiInputBase-input').type("Test")
    cy.get("[data-test=\"submit-modal-request\"]").should("be.disabled");
  });

  it("US4792 validate that user not be able submit request without fill out data in require field \"What we can do for you\"", () => {
    cy.visit("#/browse");
    cy.get("#product-select").type("IMG{downArrow}{enter}{esc}");
    cy.get('#classes-select').type("Bailee{downArrow}{enter}{esc}");
    cy.get("[data-test=addState]").click();
    cy.get("[data-test=selectMU]").click().type("{esc}");
    cy.get("#packageType-select").type("Bulletins{downArrow}{enter}{esc}");

    cy.get("[data-test=\"browseScreen-item-product-request-button\"] > .MuiButton-label").click();
    cy.get('[data-test="request-modal-searched-terms"] > .MuiInputBase-root > .MuiInputBase-input').type("Test")
    cy.get("[data-test=\"submit-modal-request\"]").should("be.disabled");
  });
});
//     });
//   });
// });
