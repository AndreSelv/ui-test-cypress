describe("Change the Info of Users Tab to Check History Records", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.bootStrapOrg1();

          cy.viewport(size, orientation);
        });

        it("Delete User1 Lastname1 History", () => {
          cy.visit("#/orgs/org1");

          cy.fixture("/orgs/org1/history").then((history) => {
            history.data[0].action = "delete";
            history.data[0].resourceName = "orgs.users";

            cy.route("POST", "/orgs/org1/transactions", history);
          });

          cy.contains("HISTORY").click();
          cy.contains(
            "John Doe (External User) removed a user from Test Org 1"
          );
        });

        it("Add User9 Lastname1 History", () => {
          cy.visit("#/orgs/org1");

          cy.fixture("/orgs/org1/history").then((history) => {
            history.data[0].action = "create";
            history.data[0].resourceName = "orgs.users";

            cy.route("POST", "/orgs/org1/transactions", history);
          });

          cy.contains("HISTORY").click();
          cy.contains("John Doe (External User) added a user to Test Org 1");
        });

        it("Update the Role of A User History", () => {
          cy.visit("#/orgs/org1");

          cy.fixture("/orgs/org1/history").then((history) => {
            history.data[0].action = "update";
            history.data[0].resourceName = "orgs.users";

            cy.route("POST", "/orgs/org1/transactions", history);
          });

          cy.contains("HISTORY").click();
          cy.contains("John Doe (External User) updated a user in Test Org 1");
        });
      });
    });
  });
});
