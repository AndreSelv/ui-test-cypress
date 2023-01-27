describe("Sign In Process", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.viewport(size, orientation);
        });

        it("Sign In for the First Time and Agree with 'Terms and Conditions' ", () => {

          cy.initAmplify();
          cy.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));

           cy.fixture("orgs/org1/myUser.json").then((user) => {
            delete user.termsAccepted;
            cy.intercept("GET", `/users/${Cypress.env("USER")}`, user).as("getEmail");
          });
          cy.visit("/#");
          cy.get("[data-test=Agree]").click();
        });

        it("Sign In for the First Time and Disagree with 'Terms and Conditions'", () => {

          cy.initAmplify();
          cy.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));

          cy.fixture("orgs/org1/myUser.json").then((user) => {
            delete user.termsAccepted;
            cy.intercept("GET", `/users/${Cypress.env("USER")}`, user).as("getEmail");
          });

          cy.visit("/#");

          cy.contains("DISAGREE").should(
            "have.attr",
            "href",
            "https://www.aaisonline.com",
          );
        });

        // TODO: Sign in with Blank Username and Blank Password
        it("Sign in with Blank Username and Blank Password", () => {
          cy.visit("/#");

          cy.get("[data-test=authenticator-error]").should("not.exist");

          cy.get("div[style=\"flex-direction: column;\"] > .amplify-button--primary").click();

          cy.contains("Welcome").should("not.exist");

        });

        it("Sign in with Blank Username", () => {
          cy.visit("/#");

          cy.contains("Welcome").should("not.exist");

          cy.get("#amplify-id-\\:r4\\:").type(
            Cypress.env("PASSWORD"),
          );

          cy.get("div[style=\"flex-direction: column;\"] > .amplify-button--primary").click();

          cy.contains("Welcome").should("not.exist");
        });

        it("Sign in with Invalid Username", () => {
          cy.visit("/#");

          cy.contains("Welcome").should("not.exist");

          cy.get("#amplify-id-\\:r1\\:").type(
            "testUsers",
          );

          cy.get("#amplify-id-\\:r4\\:").type(
            Cypress.env("PASSWORD"),
          );

          cy.get("div[style=\"flex-direction: column;\"] > .amplify-button--primary").click();

          cy.get(".amplify-alert").should("contain", "User does not exist.");

          cy.contains("Welcome").should("not.exist");
        });

        it("Sign in with Blank Password", () => {
          cy.visit("/#");

          cy.contains("Welcome").should("not.exist");

          cy.get("#amplify-id-\\:r1\\:").type(
            Cypress.env("USERNAME"),
          );

          cy.get("div[style=\"flex-direction: column;\"] > .amplify-button--primary").click();

          cy.contains("Welcome").should("not.exist");
        });

        it("Sign in with Invalid Password", () => {
          cy.visit("/#");

          cy.contains("Welcome").should("not.exist");

          cy.get("#amplify-id-\\:r1\\:").type(
            Cypress.env("USERNAME"),
          );

          cy.get("#amplify-id-\\:r4\\:").type(
            "123456vV",
          );

          cy.get("div[style=\"flex-direction: column;\"] > .amplify-button--primary").click();

          cy.get(".amplify-alert").should("contain", "Incorrect username or password.");

          cy.contains("Welcome").should("not.exist");
        });
      });
    });
  });
});
