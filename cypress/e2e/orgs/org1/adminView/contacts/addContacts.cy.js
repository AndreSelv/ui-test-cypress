describe("Add User Contacts for Positions", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.bootStrapOrg1();

          cy.viewport(size, orientation);
        });

        it("Add User5 for Meeting Notice and Proxy Contact", () => {
          cy.visit("#/orgs/org1");
          cy.fixture("/orgs/org1/org1.json").then((org1) => {
            org1.contacts.meetingNoticeAndProxy.push({
               userId: "user5",
               created: "2020-06-20T16:14:21.207",
             });
            cy.intercept("GET", `/orgs/org1`, org1).as("getEmail");
          });

          cy.get('[data-test="Add-Meeting Notice and Proxy Contact"]')
            .find("[data-test=Add]")
            .click();
          cy.get("[data-test=pickUser]")
            .click()
            .type("user5@aaisdirect.com{downarrow}{enter}");

          cy.get('.MuiDialogActions-root > .MuiButton-contained').click();

          cy.get('[data-test="Meeting Notice and Proxy Contact"]').should(
            "contain",
            "User5 Lastname5"
          );
        });

        it("Add User3 for Invoice Contact", () => {
          cy.visit("#/orgs/org1");
          cy.fixture("/orgs/org1/org1.json").then((org1) => {
           org1.contacts.assessmentInvoice.push({
               userId: "user3",
               created: "2019-06-15T14:19:20.207Z",
              });
            cy.intercept("GET", `/orgs/org1`, org1).as("getEmail");
          });
          cy.get('[data-test="Add-Invoice Contact"]')
            .find("[data-test=Add]")
            .click();
          cy.get("[data-test=pickUser]")
            .click()
            .type("user3@aaisdirect.com{downarrow}{enter}");

          cy.get('.MuiDialogActions-root > .MuiButton-contained').click();

          cy.get('[data-test="Invoice Contact"]').should("contain", "User3");
        });

        it("Add User3 and User5 for Meeting Notice and Proxy Contact", () => {
          cy.visit("#/orgs/org1");

        cy.fixture("/orgs/org1/org1.json").then((org1) => {
           org1.contacts.meetingNoticeAndProxy.push({
              userId: "user5",
              created: "2020-06-20T16:14:21.207",
            });
            cy.intercept("GET", `/orgs/org1`, org1).as("getEmail");
          });

          cy.get('[data-test="Add-Meeting Notice and Proxy Contact"]')
            .find("[data-test=Add]")
            .click();
          cy.get("[data-test=pickUser]")
            .click()
            .type("user5@aaisdirect.com{downarrow}{enter}");

          cy.get('.MuiDialogActions-root > .MuiButton-contained').click();

          cy.get('[data-test="Meeting Notice and Proxy Contact"]').should(
            "contain",
            "User5 Lastname5"
          );

           cy.fixture("/orgs/org1/org1.json").then((org1) => {
          org1.contacts.meetingNoticeAndProxy.push(
              {
                userId: "user5",
                created: "2020-06-20T16:14:21.207",
              },
              {
                userId: "user3",
                created: "2019-06-15T14:19:20.207Z",
              }
            );
            cy.intercept("GET", `/orgs/org1`, org1).as("getEmail");
          });

          cy.get('[data-test="Add-Meeting Notice and Proxy Contact"]')
            .find("[data-test=Add]")
            .click();
          cy.get("[data-test=pickUser]")
            .click()
            .type("user3@aaisdirect.com{downarrow}{enter}");

          cy.get('.MuiDialogActions-root > .MuiButton-contained').click();

          cy.get('[data-test="Meeting Notice and Proxy Contact"]')
            .should("contain", "User5 Lastname5")
            .and("contain", "User3 Lastname3");
        });
      });
    });
  });
});
