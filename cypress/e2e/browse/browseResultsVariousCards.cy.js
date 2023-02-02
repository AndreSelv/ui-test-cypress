describe("Browse Results for Various Cards", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });

        it("US74540 Browse Results for Various Cards", () => {
          cy.intercept("POST", "/assets/v1/search", { fixture: "browse/browseResultsVariousCards.json" });
          cy.visit("#/browse");
          cy.get("#product-select").type("AGOP{downArrow}{enter}{esc}");
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectCO]").click().type("{esc}");
          cy.get("#packageType-select").type("Forms{downArrow}{enter}{esc}");
          cy.get("[data-test=browseScreenSearch]").type("water{enter}");


          // testMaterialType(0, "form", "Form");
          // testMaterialType(1, "lossCost", "Loss Cost");
          // testMaterialType(2, "rules", "Rules");
          // testMaterialType(3, "ratingInformation", "Rating Info");
          // testMaterialType(4, "supportingInformation", "Supporting Documents");

          testProductLine(1, 2);
          testProductLine(0, 1);
          testProductLine(3, 5);
          testProductLine(7, 1);
          testProductLine(8, 1);
          testProductLine(9, 1);

          testState(2, 1, "AGOP states");
          testState(10, 12, "AGOP states");
          testState(0, 2, "AGOP states");
          testState(2, 1, "AGOP states");
          testState(3, 1, "AGOP states");
          testState(4, 1, "AGOP states");


          // testStatus(0, "externallyApproved", "Current");
          // testStatus(1, "superseded", "Not Current");
        });
      });
    });
  });
});

function testMaterialType(cardNumber, materialType, toolTip) {
  cy.get(
    `[data-test=browseResults-item-${cardNumber}-${materialType}-icon]`,
  ).trigger("mouseover");
  cy.get(
    `[data-test=browseResults-item-${cardNumber}-${materialType}-tooltip]`,
  ).should("contain", toolTip);
  cy.get(
    `[data-test=browseResults-item-${cardNumber}-${materialType}-icon]`,
  ).trigger("mouseout");
}

function testProductLine(cardNumber, count) {
  cy.get(`[data-test=browseResults-item-${cardNumber}-line-icon]`).trigger(
    "mouseover",
  );
  cy.get(`[data-test=browseResults-item-${cardNumber}-line-badge]`).should(
    "contain",
    `${count}`,
  );
  cy.get(`[data-test=browseResults-item-${cardNumber}-line-tooltip]`).should(
    "contain",
    "Product Lines",
  );

  cy.get(`[data-test=browseResults-item-${cardNumber}-line-icon]`).trigger(
    "mouseout",
  );
}

function testState(cardNumber, count, toolTip) {
  cy.get(`[data-test=browseResults-item-${cardNumber}-state-icon]`).trigger(
    "mouseover",
  );
  cy.get(`[data-test=browseResults-item-${cardNumber}-state-badge]`).should(
    "contain",
    `${count}`,
  );
  cy.get(`[data-test=browseResults-item-${cardNumber}-state-tooltip]`).should(
    "contain",
    toolTip,
  );

  cy.get(`[data-test=browseResults-item-${cardNumber}-state-icon]`).trigger(
    "mouseout",
  );
}

function testStatus(cardNumber, status, toolTip) {
  cy.get(`[data-test=browseResults-item-${cardNumber}-${status}-icon]`).trigger(
    "mouseover",
  );
  cy.get(
    `[data-test=browseResults-item-${cardNumber}-${status}-tooltip]`,
  ).should("contain", toolTip);
  cy.get(`[data-test=browseResults-item-${cardNumber}-${status}-icon]`).trigger(
    "mouseout",
  );
}
