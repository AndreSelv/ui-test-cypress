describe.skip("Sign Up A New User - Prevent Users from Registering", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.viewport(size, orientation);
        });

        it("The First field is Empty", () => {
          cy.visit("/");
          cy.contains("Create account").click();

          cy.get("[data-test=authenticator-error]").should("not.exist");

          cy.get("[data-test=sign-up-non-phone-number-input]")
            .eq(1)
            .type("aaaaaa");

          cy.contains("CREATE ACCOUNT").click();
          cy.get("[data-test=authenticator-error]")
            .should("be.visible")
            .and(
              "contain",
              "The following fields need to be filled out: Contact membership@aaisonline.com to register"
            );
        });

        it("The Second Field is Empty", () => {
          cy.visit("/");
          cy.contains("Create account").click();

          cy.get("[data-test=authenticator-error]").should("not.exist");

          cy.get("[data-test=sign-up-non-phone-number-input]")
            .eq(0)
            .type("aaaaaa");

          cy.contains("CREATE ACCOUNT").click();
          cy.get("[data-test=authenticator-error]")
            .should("be.visible")
            .and(
              "contain",
              "The following fields need to be filled out: Contact membership@aaisonline.com to register"
            );
        });

        it("Filled All Fields But Cannot Sign Up", () => {
          cy.visit("/");
          cy.contains("Create account").click();

          cy.get("[data-test=authenticator-error]").should("not.exist");

          cy.get("[data-test=sign-up-non-phone-number-input]")
            .eq(0)
            .type("aaaaaa");
          cy.get("[data-test=sign-up-non-phone-number-input]")
            .eq(1)
            .type("aaaaaa");

          cy.contains("CREATE ACCOUNT").click();
          cy.get("[data-test=authenticator-error]")
            .should("be.visible")
            .and("contain", "Password cannot be empty");
        });

        // TODO: Add test case (An External User)
        it("External Users Cannot Sign Up", () => {
          cy.visit("/");
          cy.contains("Create account").click();

          cy.get("[data-test=authenticator-error]").should("not.exist");

          cy.get("[data-test=sign-up-non-phone-number-input]")
            .eq(0)
            .type("miked@aaisonline.com");
          cy.get("[data-test=sign-up-non-phone-number-input]")
            .eq(1)
            .type("aaaaaaaaa");

          cy.contains("CREATE ACCOUNT").click();
          cy.get("[data-test=authenticator-error]")
            .should("be.visible")
            .and("contain", "Password cannot be empty");
        });
      });
    });
  });
});
