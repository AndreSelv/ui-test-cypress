describe("Access My Profile - Update Info", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.visit("#/");
          cy.contains("TU").click();
          cy.contains("my Profile").click();
          cy.viewport(size, orientation);
        });

        it("Update First Name", () => {

          cy.get("[data-test=titlebar]").should("contain", "Test");
          // Delete "hn" from "John" and adding "ey"

          cy.get("[data-test=firstName]").clear().type("Teey");

          cy.contains("UPDATE").click();

          cy.get("[data-test=titlebar]").should("contain", "Teey");

          cy.get("[data-test=firstName]").clear().type("Test");

          cy.contains("UPDATE").click();

          cy.get("[data-test=titlebar]").should("contain", "Test");

        });

        it("Update Last Name", () => {
          cy.get("[data-test=titlebar]").should("contain", "Test User");

          cy.get("[data-test=lastName]").type(
            "{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}Selvan"
          );

          cy.contains("UPDATE").click();
          cy.get("[data-test=titlebar]").should("contain", "Selvan");
          cy.get("[data-test=lastName]").clear().type('User')
          cy.contains("UPDATE").click();
          cy.get("[data-test=titlebar]").should("contain", "User");

        });

        it("Update Phone", () => {
          // cy.fixture("orgs/org1/myUser").then((user) => {
          //   user.phoneNumbers = {
          //     office: [
          //       {
          //         phoneNumber: "2171234567",
          //         phoneNumberId: "phone1",
          //         countryCode: "+1",
          //         created: "2020-07-13T20:29:03.334Z",
          //       },
          //     ],
          //   };
          //   cy.route(
          //     "GET",
          //     "/users/659a5e72-01c2-41dc-b962-e797b25d1636",
          //     user
          //   );
          // });

          cy.get("[data-test=Phone]").clear().type("2171234567");
          cy.contains("UPDATE").click();
          cy.get("[data-test=Phone]").should("have.value", "2171234567");
          cy.get("[data-test=Phone]").clear().type("123456789");
          cy.contains("UPDATE").click();
          cy.get("[data-test=Phone]").should("have.value", "123456789");

        });

        it("Update Phone and Extension", () => {

          cy.get("[data-test=Phone]").clear().type("2171234567");
          cy.get("[data-test=Extension]").clear().type("1234");

          cy.contains("UPDATE").click();

          cy.get('[data-test=Phone]')
            .should("have.value", "2171234567");
          cy.get("[data-test=Phone]").clear().type("123456789");

          cy.contains("UPDATE").click();

          cy.get('[data-test=Phone]')
            .should("have.value", "123456789");
        });

        it("First name Is Empty", () => {
          cy.get("[data-test=snackbar]").should("not.exist");

          cy.get("[data-test=firstName]").type("{selectall}{backspace}");
          cy.contains("UPDATE").click();

          cy.get("[data-test=snackbar]")
            .should("be.visible")
            .and("contain", "Firstname cannot be empty");
        });

        it("Last name Is Empty", () => {
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
