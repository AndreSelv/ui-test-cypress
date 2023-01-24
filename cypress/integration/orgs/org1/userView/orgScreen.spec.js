describe("Check individual Organization", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.bootStrapOrg1();

          cy.fixture("orgs/org1/org1").then((org1) => {
            org1.users[0].roleKey = "read-only";
            org1.contacts.aaisDirectCompanyAdmin.pop();

            cy.route("GET", "/orgs/org1", org1);
          });

          cy.viewport(size, orientation);
        });

        it("Minimize Title Bar", () => {
          cy.visit("#/orgs/org1");

          cy.get("[data-test=expansion-details]").should("be.visible");

          cy.get("[data-test=titlebar]").click();
          cy.get("[data-test=expansion-details]").should("not.exist");
        });

        it("Check Contacts Tab ", () => {
          cy.visit("#/orgs/org1");

          cy.contains("Test Org 1");

          cy.get('[data-test="AAISdirect Administrator"]').should(
            "contain",
            "User1 Lastname1"
          );

          cy.get('[data-test="Meeting Notice and Proxy Contact"]').should(
            "contain",
            "User2 Lastname2"
          );

          cy.get('[data-test="Statistical Reporting Contact"]').should(
            "contain",
            "User3 Lastname3"
          );

          cy.get('[data-test="Underwriting Platform (UP) Contact"]').should(
            "contain",
            "User6 Lastname6"
          );

          cy.get('[data-test="Invoice Contact"]').should(
            "contain",
            "User5 Lastname5"
          );

          cy.get('[data-test="Affilation Contact"]').should(
            "contain",
            "User1 Lastname1"
          );

          cy.get("[data-test=Add]").should("not.exist");

          // FIXME: Remove These Checks
          // TODO: Add A Separate Test Case
        });

        it("Check Users Tab", () => {
          cy.visit("#/orgs/org1");

          cy.contains("USERS").click();

          cy.contains("Users (9)");

          // TODO: Assert at least Some Users on the Screen
          cy.contains("User1 Lastname1");
          cy.contains("User2 Lastname2");
          cy.contains("User3 Lastname3");

          cy.get("[data-test=addUserButton]").should("not.exist");
        });

        it("Check Addresses Tab", () => {
          cy.visit("#/orgs/org1");

          cy.contains("ADDRESSES").click();

          // TODO: Assert at least Some Addresses on the Screen
          cy.get('[data-test="Mailing Address"]').should(
            "contain",
            "701 Warrenville Rd"
          );

          cy.get("[data-test=Add]").should("not.exist");
        });

        it("Check Contact Cards", () => {
          cy.visit("#/orgs/org1");
          cy.contains("ADDRESSES").click();

          cy.contains("UPDATE").should("not.exist");
          cy.contains("REMOVE").should("not.exist");
        });

        it("Check Address Cards", () => {
          cy.visit("#/orgs/org1");

          cy.contains("UPDATE").should("not.exist");
          cy.contains("REMOVE").should("not.exist");
        });
      });
    });
  });
});
