const UserPage = require("../../support/PageObjects/UserPage");
const userPage = new UserPage();
describe("Access To Admin Panel", () => {

  beforeEach(() => {
    cy.initAmplify();
    cy.login();
    cy.visit("#/");
    cy.contains("TU").click({ force: true });;
    cy.contains("Admin").click({ force: true });
  });

  it("List of the recent logins should be visible", () => {
    cy.get("#logins-table").should("be.visible");
    cy.contains("Days to look back:")
    cy.get("#raw-radio-button").should("be.visible")
    cy.get("#summary-radio-button").should("be.visible")
  });

  it("Radio buttons should be visible", () => {
    cy.get("#raw-radio-button").should("be.visible")
    cy.get("#summary-radio-button").should("be.visible")
  });

  it("Days to look back should be visible", () => {
    cy.contains("Days to look back:")
    cy.get("#days-select").should("have.value", "7");
  });

  it("Days to look back should be visible", () => {
    cy.get("#summary-radio-button").click()
    cy.get("#logins-table").should("be.visible");
  });
});
