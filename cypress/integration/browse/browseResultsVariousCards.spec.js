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
          cy.server();

          cy.route({
            method: "POST",
            url: "/assets/v1/search",
            response: "fixture:browse/browseResultsVariousCards.json",
          });

          cy.visit("#/browse");
          cy.get("[data-test=browseProduct]").click();
          cy.get('[data-value="AGOP"]').click();

          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectCO]").click();

          cy.get("[data-test=packageType]").click();
          cy.get('[data-value="PFM"]').click();

          cy.get("[data-test=status]").click();
          cy.get('[data-value="Externally Approved"]').click();

          testMaterialType(0, "form", "Form");
          testMaterialType(1, "lossCost", "Loss Cost");
          testMaterialType(2, "rules", "Rules");
          testMaterialType(3, "ratingInformation", "Rating Info");
          testMaterialType(4, "supportingInformation", "Supporting Documents");

          testProductLine(1, 2);
          testProductLine(0, 1);
          testProductLine(3, 5);
          testProductLine(7, 0);
          testProductLine(8, 0);
          testProductLine(9, 0);

          testState(2, 1, "AGOP states");
          testState(10, 12, "AGOP states");

          testStatus(0, "externallyApproved", "Current");
          testStatus(1, "superseded", "Not Current");
        });
      });
    });
  });
});
function testMaterialType(cardNumber, materialType, toolTip) {
  cy.get(
    `[data-test=browseResults-item-${cardNumber}-${materialType}-icon]`
  ).trigger("mouseover");
  cy.get(
    `[data-test=browseResults-item-${cardNumber}-${materialType}-tooltip]`
  ).should("contain", toolTip);
  cy.get(
    `[data-test=browseResults-item-${cardNumber}-${materialType}-icon]`
  ).trigger("mouseout");
}

function testProductLine(cardNumber, count) {
  cy.get(`[data-test=browseResults-item-${cardNumber}-line-icon]`).trigger(
    "mouseover"
  );
  cy.get(`[data-test=browseResults-item-${cardNumber}-line-badge]`).should(
    "contain",
    `${count}`
  );
  cy.get(`[data-test=browseResults-item-${cardNumber}-line-tooltip]`).should(
    "contain",
    "Product Lines"
  );

  cy.get(`[data-test=browseResults-item-${cardNumber}-line-icon]`).trigger(
    "mouseout"
  );
}

function testState(cardNumber, count, toolTip) {
  cy.get(`[data-test=browseResults-item-${cardNumber}-state-icon]`).trigger(
    "mouseover"
  );
  cy.get(`[data-test=browseResults-item-${cardNumber}-state-badge]`).should(
    "contain",
    `${count}`
  );
  cy.get(`[data-test=browseResults-item-${cardNumber}-state-tooltip]`).should(
    "contain",
    toolTip
  );

  cy.get(`[data-test=browseResults-item-${cardNumber}-state-icon]`).trigger(
    "mouseout"
  );
}

function testStatus(cardNumber, status, toolTip) {
  cy.get(`[data-test=browseResults-item-${cardNumber}-${status}-icon]`).trigger(
    "mouseover"
  );
  cy.get(
    `[data-test=browseResults-item-${cardNumber}-${status}-tooltip]`
  ).should("contain", toolTip);
  cy.get(`[data-test=browseResults-item-${cardNumber}-${status}-icon]`).trigger(
    "mouseout"
  );
}
