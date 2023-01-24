describe("Sign In Process", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.viewport(size, orientation);
        });

        it("Sign In for the First Time and Agree with 'Terms and Conditions' ", () => {
          cy.server();

          cy.fixture("orgs/org1/user").then((user) => {
            delete user.termsAccepted;
            cy.route(
              "GET",
              "/users/659a5e72-01c2-41dc-b962-e797b25d1636",
              user
            );
          });

          cy.visit("/#");

          cy.get("[data-test=username-input]").type(
            Cypress.env("USERNAME")
          );

          cy.get("[data-test=sign-in-password-input]").type(
            Cypress.env("PASSWORD")
          );

          cy.get("[data-test=sign-in-sign-in-button]").click();

          cy.get("[data-test=Agree]").click();
        });

        it("Sign In for the First Time and Disagree with 'Terms and Conditions'", () => {
          cy.server();

          cy.fixture("orgs/org1/user").then((user) => {
            delete user.termsAccepted;
            cy.route(
              "GET",
              "/users/659a5e72-01c2-41dc-b962-e797b25d1636",
              user
            );
          });

          cy.visit("/#");

          cy.get("[data-test=username-input]").type(
            Cypress.env("USERNAME")
          );

          cy.get("[data-test=sign-in-password-input]").type(
            Cypress.env("PASSWORD")
          );

          cy.get("[data-test=sign-in-sign-in-button]").click();

          cy.contains("DISAGREE").should(
            "have.attr",
            "href",
            "https://www.aaisonline.com"
          );
        });

        // TODO: Sign in with Blank Username and Blank Password
        it("Sign in with Blank Username and Blank Password", () => {
          cy.visit("/#");

          cy.get("[data-test=authenticator-error]").should("not.exist");

          cy.get("[data-test=sign-in-sign-in-button]").click();

          cy.get("[data-test=authenticator-error]")
            .should("be.visible")
            .and("contain", "Username cannot be empty");
        });

        it("Sign in with Blank Username", () => {
          cy.visit("/#");

          cy.get("[data-test=authenticator-error]").should("not.exist");

          cy.get("[data-test=sign-in-password-input]").type(
            Cypress.env("PASSWORD")
          );

          cy.get("[data-test=sign-in-sign-in-button]").click();

          cy.get("[data-test=authenticator-error]")
            .should("be.visible")
            .and("contain", "Username cannot be empty");
        });

        it("Sign in with Invalid Username", () => {
          cy.visit("/#");

          cy.get("[data-test=authenticator-error]").should("not.exist");

          cy.get("[data-test=username-input]").type("AAA");

          cy.get("[data-test=sign-in-password-input]").type(
            Cypress.env("PASSWORD")
          );

          cy.get("[data-test=sign-in-sign-in-button]").click();

          cy.get("[data-test=authenticator-error]")
            .should("be.visible")
            .and("contain", "User does not exist");
        });

        it("Sign in with Blank Password", () => {
          cy.visit("/#");

          cy.get("[data-test=authenticator-error]").should("not.exist");

          cy.get("[data-test=username-input]").type(
            Cypress.env("USERNAME")
          );

          cy.get("[data-test=sign-in-sign-in-button]").click();

          cy.get("[data-test=authenticator-error]")
            .should("be.visible")
            .and(
              "contain",
              "Custom auth lambda trigger is not configured for the user pool."
            );
        });

        it("Sign in with Invalid Password", () => {
          cy.visit("/#");

          cy.get("[data-test=authenticator-error]").should("not.exist");

          cy.get("[data-test=username-input]").type(
            Cypress.env("USERNAME")
          );

          cy.get("[data-test=sign-in-password-input]").type("AAAAA");

          cy.get("[data-test=sign-in-sign-in-button]").click();

          cy.get("[data-test=authenticator-error]")
            .should("be.visible")
            .and("contain", "Incorrect username or password");
        });
      });
    });
  });
});
