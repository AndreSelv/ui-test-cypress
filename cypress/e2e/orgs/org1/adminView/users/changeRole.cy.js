describe("Change Roles of an Org", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.bootStrapOrg1();

          cy.viewport(size, orientation);
        });

        it("Change User3 as Manager", () => {

          cy.visit(`#/orgs/${Cypress.env("ORG")}`);
          cy.get(':nth-child(2) > .MuiTab-wrapper').click();
          cy.get("[data-test='rowDisplay-vasilich85+1@gmail.com']")
            .find("[data-test=roleChange]")
            .click("left");
          cy.get("[data-test=Manager]").click();
          cy.get("[data-test='rowDisplay-vasilich85+1@gmail.com']").should(
            "contain",
            "Manager"
          );
        });

        it("Change User6 as Administrator", () => {
          cy.visit(`#/orgs/${Cypress.env("ORG")}`);
          cy.get(':nth-child(2) > .MuiTab-wrapper').click();
          cy.wait(500)
          cy.get("[data-test='rowDisplay-vasilich85+1@gmail.com']")
            .find("[data-test=roleChange]")
            .click("left");
          cy.get("[data-test=Admin]").click();
          cy.get("[data-test='rowDisplay-vasilich85+1@gmail.com']").should(
            "contain",
            "Admin"
          );
          // Test User6 Lastname6 has been added as AAISdirect Administrator in "CONTACTS" tab
          cy.get('[data-test="expansion-details"]').should(
            "contain",
            "vasilich85+1@gmail.com"
          );
        });
        it("Change John as A Normal User", () => {
           cy.visit(`#/orgs/${Cypress.env("ORG")}`);
          cy.get(':nth-child(2) > .MuiTab-wrapper').click();
          cy.wait(500)
          cy.get("[data-test='rowDisplay-vasilich85+1@gmail.com']")
            .find("[data-test=roleChange]")
            .click("left");
          cy.get("[data-test=User]").click();
          cy.get("[data-test='rowDisplay-vasilich85+1@gmail.com']").should(
            "not.contain",
            "Admin"
          );
          // Test User6 Lastname6 has been added as AAISdirect Administrator in "CONTACTS" tab
          cy.get('[data-test="expansion-details"]').should(
            "not.contain",
            "vasilich85+1@gmail.com"
          );

          // cy.fixture("orgs/org1/org1").then((org1) => {
          //   org1.users[0].roleKey = "read-only";
          //   org1.contacts.aaisDirectCompanyAdmin.pop();
          //
          //   cy.route("GET", "/orgs/org1", org1);
          });

          // Test that John is able to delete the user or add contacts
          // cy.get('[data-test="Add"]')
          //   .should("be.visible")
          //   .and("have.length", 7);
          //
          // cy.get(':nth-child(2) > .MuiTab-wrapper').click();
          //
          // cy.get("[data-test=roleDelete]")
          //   .should("be.visible")
          //   .and("have.length", 9);
          //
          // cy.get("[data-test='rowDisplay-findlayclarke@aaisdirect.com']")
          //   .find("[data-test=roleChange]")
          //   .click("left");
          //
          // cy.get("[data-test=User]").click();
          //
          // cy.get(
          //   "[data-test='rowDisplay-findlayclarke@aaisdirect.com']"
          // ).should("contain", "User");
          //
          // // Test that John has no access to delete the urser or add contacts
          // cy.get("[data-test=roleDelete]").should("not.exist");
          //
          // cy.contains("CONTACTS").click();
          // cy.get('[data-test="Add"]').should("not.exist");
          //
          // cy.get('[data-test="AAISdirect Administrator"]').should(
          //   "not.contain",
          //   "John Doe"
          // );
        //});
      });
    });
  });
});
