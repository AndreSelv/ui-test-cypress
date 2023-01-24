describe("Change the Info of Contacts Tab to Check History Records", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.bootStrapOrg1();

          cy.viewport(size, orientation);
        });

        it("Remove User2 from Meeting Notice And Proxy Contact History", () => {
          cy.visit("#/orgs/org1");

          cy.fixture("/orgs/org1/history").then((history) => {
            history.data[0].action = "delete";
            history.data[0].resourceName = "orgs.contacts";

            cy.route("POST", "/orgs/org1/transactions", history);
          });

          cy.contains("HISTORY").click();
          cy.contains(
            "John Doe (External User) removed a contact from Test Org 1"
          );
        });

        it("Add User3 to Invoice Contact History", () => {
          cy.visit("#/orgs/org1");

          cy.fixture("/orgs/org1/history").then((history) => {
            history.data[0].action = "create";
            history.data[0].resourceName = "orgs.contacts";

            cy.route("POST", "/orgs/org1/transactions", history);
          });

          cy.contains("HISTORY").click();
          cy.contains("John Doe (External User) added a contact to Test Org 1");
        });
      });
    });
  });
});
