describe("Delete a User of an Org", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.bootStrapOrg1();

          cy.viewport(size, orientation);
        });

        it.skip("Delete User1 Lastname1", () => {
          cy.visit("#/orgs/org1");

          cy.contains("USERS").click();

          cy.route({
            method: "DELETE",
            url: "/orgs/org1/users/user1?audit=true",
            response: {},
          });

          cy.route({
            method: "DELETE",
            url: "/orgs/org1/users/user1",
            response: {},
          });

          cy.fixture("orgs/org1/org1").then((org1) => {
            org1.users.splice(1, 1);

            // Remove all the positions of User1
            org1.contacts.aaisDirectCompanyAdmin.splice(0, 1);
            org1.contacts.statisticalReporting.splice(1, 1);
            org1.contacts.affilation.pop();

            cy.route("GET", "/orgs/org1", org1);
          });

          cy.fixture("orgs/org1/users").then((users) => {
            users.slice(1, 1);

            cy.route(
              "GET",
              "/users?userIds=659a5e72-01c2-41dc-b962-e797b25d1636,user2,user3,user4,user5,user6,user7,user8",
              users
            );
          });

          cy.get('[data-test="rowDisplay-user1@aaisdirect.com"]')
            .find("[data-test=roleDelete]")
            .click();
          cy.contains("button", "REMOVE").click();

          cy.contains("Users (8)");

          cy.contains("CONTACTS").click();

          // Test that all the positions of User1 Lastname1 have been removed
          cy.get('[data-test="AAISdirect Administrator"]')
            .should("not.contain", "User1 Lastname1")
            .and("be.visible");

          cy.get('[data-test="Statistical Reporting Contact"]')
            .should("not.contain", "User1 Lastname1")
            .and("be.visible");

          cy.get('[data-test="Affilation Contact"]')
            .should("not.contain", "User1 Lastname1")
            .and("not.be.visible");
        });
      });
    });
  });
});
