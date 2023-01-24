describe("Check that orgs are created", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.bootStrapOrg1();

          cy.viewport(size, orientation);
        });

        it("Company number field is present into Organization portal", () => {
          cy.visit("#/orgs");
          cy.get('.MuiButton-label').contains('Create Org').click()
          cy.get("#companyNumber").should("be.visible");
        });

        it("TC4856 Validate that user can not create org with already existing company number ", () => {
          cy.visit("#/orgs");
          cy.get('.MuiButton-label').contains('Create Org').click()
          cy.get("#companyNumber").should("be.visible");

          cy.get('#name').type("Company Test Name");
          cy.get('#companyNumber').type("1111") //already existing company number
          cy.get('.MuiButton-contained').contains("Create").click();
          cy.contains('Org already exists.').should('be.exist');
        });

      });
    });
  });
});
