describe("Change the Info of Addresses Tab to Check History Records", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.bootStrapOrg1();
          cy.viewport(size, orientation);
        });

        it("Remove 701 Warrenville Rd Address History", () => {
          cy.visit("#/orgs/org1");
          cy.fixture("/orgs/org1/history.json").then((history) => {
            history.data[0].action = "create";
            history.data[0].resourceName = "orgs.addresses";
            cy.intercept("POST", `/orgs/org1/transactions`, history).as("getEmail");
          });
          cy.get(':nth-child(4) > .MuiTab-wrapper').click();
          cy.contains('John Doe (External User)');

        });

        it("Add A Billing Address History", () => {
          cy.visit("#/orgs/org1");
         cy.fixture("/orgs/org1/history.json").then((history) => {
            history.data[0].action = "create";
            history.data[0].resourceName = "orgs.addresses";
            cy.intercept("POST", `/orgs/org1/transactions`, history).as("getEmail");
          });
          cy.get(':nth-child(4) > .MuiTab-wrapper').click();
          cy.contains('John Doe (External User)');
        });
      });
    });
  });
});
