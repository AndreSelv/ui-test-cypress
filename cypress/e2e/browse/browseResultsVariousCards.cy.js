const BrowsePage = require("../../support/PageObjects/BrowsePage");
const browsePage = new BrowsePage();
describe("Browse Results for Various Cards", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });

        it("US114431 Show user where docs is available", () => {
          cy.visit("#/browse");
          browsePage.selectProduct("BOP");
          browsePage.selectState("AL");
          browsePage.selectMaterialType("Forms");
          cy.wait(500);
          browsePage.getInfoIcon(1).should("be.visible").click();
          cy.scrollTo("top");
          browsePage.getInfoIcon(2).wait(1000).invoke("removeAttr", "target").click();
          cy.get(".MuiDialogContent-root").should("be.visible");
        });

        it.skip("US74540 Browse Results for Various Cards", () => {
          cy.intercept("POST", "/assets/v1/search", { fixture: "browse/browseResultsVariousCards.json" });
          cy.visit("#/browse");
          cy.get("#product-select").type("HO -{downArrow}{enter}{esc}");
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectIA]").click().type("{esc}");
          cy.get("#packageType-select").type("Forms{downArrow}{enter}{esc}");
          cy.get("[data-test=browseScreenSearch]").type("water{enter}");


          testMaterialType(0, "form", "Form");
          testMaterialType(1, "lossCost", "Loss Cost");
          testMaterialType(2, "rules", "Rules");
          testMaterialType(3, "ratingInformation", "Rating Info");
          testMaterialType(4, "supportingInformation", "Supporting Documents");

          testProductLine(1, 3);
          testProductLine(0, 2);
          testProductLine(3, 1);
          testProductLine(7, 1);
          testProductLine(8, 1);
          testProductLine(9, 1);

          testState(2, 43, "HO states");
          testState(10, 48, "HO states");
          testState(0, 48, "HO states");
          testState(1, 49, "HO states");
          testState(3, 41, "HO states");
          testState(4, 51, "HO states");


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
