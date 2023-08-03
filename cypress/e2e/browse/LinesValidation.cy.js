const LINES = require("../../fixtures/enums/LINES");
const BrowsePage = require("../../support/PageObjects/BrowsePage");
const browsePage = new BrowsePage();
describe("Product Lines persistence", () => {
  beforeEach(() => {
    cy.initAmplify();
    cy.login();
    cy.visit("#/browse");
    browsePage.getProduct().click()
  });

  it("Validate ALL Lines check box functionality", () => {
    cy.wrap(LINES).each((line) => {
      browsePage.selectProduct(line.key)
      browsePage.getProductSection().should("contain.text", line.title)
    });
  });

  it("Validate EACH Lines check box functionality", () => {
    cy.wrap(LINES).each((line) => {
      browsePage.selectProduct(line.key)
      browsePage.getProductSection().should("contain.text", line.title)
      browsePage.getCloseProductsButton().click()
    });
  });
});