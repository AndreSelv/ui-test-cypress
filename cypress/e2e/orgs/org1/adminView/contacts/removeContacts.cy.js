describe("Remove User Contacts of A Position", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.bootStrapOrg1();

          cy.viewport(size, orientation);
        });

        it("Remove User2 of Meeting Notice and Proxy Contact", () => {
          cy.visit("#/orgs/org1");

          cy.route({
            method: "DELETE",
            url: "orgs/org1/contacts/meetingNoticeAndProxy",
            response: {},
          });

          cy.fixture("orgs/org1/org1").then((org1) => {
            org1.contacts.meetingNoticeAndProxy.splice(0, 1);
            cy.route("GET", "/orgs/org1", org1);
          });

          cy.get('[data-test="Meeting Notice and Proxy Contact"]')
            .find('[data-test="Action-User2 Lastname2"]')
            .contains("REMOVE")
            .click();

          cy.contains(
            "User2 Lastname2 removed as a Meeting Notice and Proxy Contact"
          );

          cy.get('[data-test="Meeting Notice and Proxy Contact"]').should(
            "not.contain",
            "User2 Lastname2"
          );
        });

        it.skip("Remove All Users of Invoice Contact", () => {
          cy.visit("#/orgs/org1");

          // Remove User 5 Lastname5
          cy.route({
            method: "DELETE",
            url: "orgs/org1/contacts/assessmentInvoice",
            response: {},
          });

          cy.fixture("orgs/org1/org1").then((org1) => {
            org1.contacts.assessmentInvoice.splice(0, 1);
            cy.route("GET", "/orgs/org1", org1);
          });

          cy.get('[data-test="Invoice Contact"]')
            .find('[data-test="Action-User5 Lastname5"]')
            .contains("REMOVE")
            .click();

          cy.contains("User5 Lastname5 removed as a Invoice Contact contact");

          cy.get('[data-test="Invoice Contact"]')
            .should("not.contain", "User5 Lastname5")
            .and("be.visible");

          // Remove User8 Lastname8
          cy.fixture("orgs/org1/org1").then((org1) => {
            org1.contacts.assessmentInvoice.splice(0, 2);
            cy.route("GET", "/orgs/org1", org1);
          });

          cy.get('[data-test="Invoice Contact"]')
            .find('[data-test="Action-User8 Lastname8"]')
            .contains("REMOVE")
            .click();

          cy.contains("User8 Lastname8 removed as a Invoice Contact contact");

          cy.get('[data-test="Invoice Contact"]')
            .should("not.contain", "User8 Lastname8")
            .and("not.be.visible");
        });
      });
    });
  });
});
