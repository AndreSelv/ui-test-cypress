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

          cy.fixture("/orgs/org1/history").then((history) => {
            history.data[0].action = "delete";
            history.data[0].resourceName = "orgs.addresses";

            cy.route("POST", "/orgs/org1/transactions", history);
          });

          cy.contains("HISTORY").click();
          cy.contains(
            "John Doe (External User) removed an address from Test Org 1"
          );
        });

        it("Add A Billing Address History", () => {
          cy.visit("#/orgs/org1");

          cy.fixture("/orgs/org1/history").then((history) => {
            history.data[0].action = "create";
            history.data[0].resourceName = "orgs.addresses";

            cy.route("POST", "/orgs/org1/transactions", history);
          });

          cy.contains("HISTORY").click();
          cy.contains(
            "John Doe (External User) added an address to Test Org 1"
          );
        });
      });
    });
  });
});
