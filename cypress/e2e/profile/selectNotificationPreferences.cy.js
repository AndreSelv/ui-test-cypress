// Because story US99853 these tests shouldn't work, it is recommended to delete them
describe("Access My Profile - Update Notification Preferences", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.visit("#/");
          cy.contains("TU").click();
          cy.get(".MuiList-root > [tabindex=\"0\"]").contains("My Profile").click();

          cy.intercept("GET", "/users/*/notification-preferences?type=BULLETINS&line=*&state=*");
          cy.get(".MuiTabs-flexContainer").contains("NOTIFICATION PREFERENCES").should("not.exist");
          cy.viewport(size, orientation);
        });

        it("Select One State for Farm Inland Marine in Farm And Ag", () => {
          cy.get(".MuiTabs-flexContainer").contains("FARM AND AG").should("not.exist");
        });
        it("Select Two States for Homewoners Exempt in Personal Lines", () => {
          cy.get(".MuiTabs-flexContainer").contains("PERSONAL LINES").should("not.exist");
        });
        it("Select All States for Commercial Crime in Commercial Lines", () => {
          cy.get(".MuiTabs-flexContainer").contains("COMMERCIAL LINES").should("not.exist");
        });
      });
    });
  });
});
