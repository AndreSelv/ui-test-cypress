describe("Access My Profile - Update Info", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.bootStrapOrg1();

          cy.visit("#/");
          cy.contains("JD").click();
          cy.contains("my Profile").click();

          cy.viewport(size, orientation);
        });

        it("Update First Name", () => {
          cy.get("[data-test=titlebar]").should("contain", "John");

          // Delete "hn" from "John" and adding "ey"
          cy.get("[data-test=firstName]").type("{backspace}{backspace}ey");

          cy.fixture("orgs/org1/user").then((user) => {
            user.firstName = "Joey";
            cy.route(
              "GET",
              "/users/659a5e72-01c2-41dc-b962-e797b25d1636",
              user
            );
          });

          cy.contains("UPDATE").click();

          cy.get("[data-test=titlebar]").should("contain", "Joey");
        });

        it("Update Last Name", () => {
          cy.get("[data-test=titlebar]").should("contain", "(External User)");

          cy.get("[data-test=lastName]").type(
            "{backspace}{backspace}{backspace}{backspace}{backspace}{backspace})"
          );

          cy.fixture("orgs/org1/user").then((user) => {
            user.lastName = "Doe (External)";
            cy.route(
              "GET",
              "/users/659a5e72-01c2-41dc-b962-e797b25d1636",
              user
            );
          });

          cy.contains("UPDATE").click();

          cy.get("[data-test=titlebar]").should("contain", "(External)");
        });

        it("Update Phone", () => {
          cy.fixture("orgs/org1/user").then((user) => {
            user.phoneNumbers = {
              office: [
                {
                  phoneNumber: "2171234567",
                  phoneNumberId: "phone1",
                  countryCode: "+1",
                  created: "2020-07-13T20:29:03.334Z",
                },
              ],
            };
            cy.route(
              "GET",
              "/users/659a5e72-01c2-41dc-b962-e797b25d1636",
              user
            );
          });

          cy.get("[data-test=Phone]").should("not.have.value", "2171234567");

          cy.get("[data-test=Phone]").type("2171234567");

          cy.contains("UPDATE").click();

          cy.get("[data-test=Phone]").should("have.value", "2171234567");
        });

        it("Update Phone and Extension", () => {
          cy.fixture("orgs/org1/user").then((user) => {
            user.phoneNumbers = {
              office: [
                {
                  phoneNumber: "2171234567",
                  Extension: "1111",
                  phoneNumberId: "phone1",
                  countryCode: "+1",
                  created: "2020-07-13T20:29:03.334Z",
                },
              ],
            };
            cy.route(
              "GET",
              "/users/659a5e72-01c2-41dc-b962-e797b25d1636",
              user
            );
          });

          // cy.get('[data-test=Phone]')
          //   .should("not.have.value", "2171234567");

          cy.get("[data-test=Phone]").type("2171234567");
          cy.get("[data-test=Extension]").type("1234");

          cy.contains("UPDATE").click();

          // cy.get('[data-test=Phone]')
          //   .should("have.value", "2171234567");
        });

        it("Firstname Is Empty", () => {
          cy.get("[data-test=snackbar]").should("not.exist");

          cy.get("[data-test=firstName]").type("{selectall}{backspace}");
          cy.contains("UPDATE").click();

          cy.get("[data-test=snackbar]")
            .should("be.visible")
            .and("contain", "Firstname cannot be empty");
        });

        it("Lastname Is Empty", () => {
          cy.get("[data-test=snackbar]").should("not.exist");

          cy.get("[data-test=lastName]").type("{selectall}{backspace}");
          cy.contains("UPDATE").click();

          cy.get("[data-test=snackbar]")
            .should("be.visible")
            .and("contain", "Lastname cannot be empty");
        });

        it("Phone is Empty", () => {
          cy.get("[data-test=snackbar]").should("not.exist");

          cy.get("[data-test=Phone]").type("{selectall}{backspace}");
          cy.get("[data-test=Extension]").type("1234");
          cy.contains("UPDATE").click();

          cy.get("[data-test=snackbar]")
            .should("be.visible")
            .and("contain", "Phone cannot be empty");
        });
      });
    });
  });
});
