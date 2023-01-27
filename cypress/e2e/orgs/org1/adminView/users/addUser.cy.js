describe("Add a User of an Org", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.bootStrapOrg1();
          cy.viewport(size, orientation);
        });

        it.skip("Add User9 Lastname1", () => {
          cy.visit("#/orgs/org1");
          cy.get(':nth-child(2) > .MuiTab-wrapper').click();
          cy.fixture("/orgs/org1/org1.json").then((org1) => {
            org1.users.push({
              roleKey: "read-only",
              userId: "user9",
            });
            cy.intercept("GET", `/orgs/org1`, org1).as("getEmail");
          });
           cy.fixture("/orgs/org1/users.json").then((users) => {
            users.push({
              userType: "external",
              lastName: "Hansen",
              created: "2020-05-27T11:18:49.841Z",
              updatedBy: "7cd03f7e-2e5d-4a39-99aa-87228f2ffcd9",
              email: "user9@aaisdirect.com",
              createdBy: "user1",
              transactionId: "39813adf-5082-49d7-8dbb-2ed5b91e9a0e",
              firstName: "User9",
              userNode: "root",
              active: true,
              updated: "2020-05-27T11:18:49.841Z",
              orgs: ["org1"],
              userId: "user9"});
            cy.intercept("GET", `/users?userIds=659a5e72-01c2-41dc-b962-e797b25d1636,user1,user2,user3,user4,user5,user6,user7,user8,user9`, users);
          });

          cy.get("[data-test=addUserButton]").click();
          cy.get("[data-test=email-input]").type("user9@aaisdirect.com");
          cy.get('.MuiDialogActions-root > .MuiButton-contained').click()
          cy.contains("Users (10)");
          cy.contains("User9 Hansen");
        });

        it("US101914 Re-add to Organization after deleting", () => {
          let user = "vasilich85+3@gmail.com"
          cy.visit(`#/orgs/${Cypress.env("ORG")}`);
          cy.get(':nth-child(2) > .MuiTab-wrapper').click();
          cy.get("[data-test=addUserButton]").click();
          cy.get("[data-test=email-input]").type(user);
          cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
          cy.contains(user);
          cy.contains(`${user} has been added`).should(`be.exist`)
          cy.get(`[data-test="rowDisplay-${user}"] > :nth-child(4) > [data-test="roleDelete"]`).click()
          cy.get('.MuiDialogActions-root > .MuiButton-contained > .MuiButton-label').click()
          cy.wait(1000);
          cy.get("[data-test=addUserButton]").click();
          cy.get("[data-test=email-input]").type(user);
          cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
          cy.contains(user);
          cy.contains(`${user} has been added`).should(`be.exist`)
          cy.get(`[data-test="rowDisplay-${user}"] > :nth-child(4) > [data-test="roleDelete"]`).click()
          cy.get('.MuiDialogActions-root > .MuiButton-contained > .MuiButton-label').click()
        });
      });
    });
  });
});
