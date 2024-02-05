describe("Timeout session", () => {

  beforeEach(() => {
    cy.initAmplify();
    cy.login();
  });

  it("US63611: Timeout error message should be visible in 30 min", () => {
    cy.visit("#/browse");
    cy.clock(0);
    cy.contains("Filter").click();
    cy.tick(60000 * 30);
    cy.contains("As a security best practice, you have been logged out due to 30 minutes of inactivity.").should("exist");
  });

  it("US63611: Timeout error message Should not be visible in 29 min", () => {
    cy.visit("#/browse");
    cy.clock(0);
    cy.contains("Filter").click();
    cy.tick(60000 * 29.99);
    cy.contains("As a security best practice, you have been logged out due to 30 minutes of inactivity.").should("not.exist");
  });
});
