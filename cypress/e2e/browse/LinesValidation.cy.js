const LINES = require("../../fixtures/enums/LINES");
describe("Product Lines persistence", () => {
  beforeEach(() => {
    cy.initAmplify();
    cy.login();
    cy.visit("#/browse");
    cy.get("#product-select").click();

  });

  it("Validate ALL Lines check box functionality", () => {
    cy.wrap(LINES).each((line) => {
      cy.contains(line.title).click();
      cy.get(`div[data-test="browseProduct"]`).should("contain.text", line.title);
    });
  });

  it("Validate EACH Lines check box functionality", () => {
    cy.wrap(LINES).each((line) => {
      cy.contains(line.title).click();
      cy.get(`div[data-test="browseProduct"]`).should("contain.text", line.title);
      cy.get("[data-testid=\"CancelIcon\"]").click();
    });
  });
});
