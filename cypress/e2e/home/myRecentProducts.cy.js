describe("My Recent Products", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });
        it("validate no recent products", () => {
          // cy.server();

          // cy.route({
          //   method: "GET",
          //   url: "/assets/v1/manifests?userId=*",
          //   response: [],
          // });

          // cy.intercept({
          //   method: "GET",
          //   url: "/assets/v1/manifests?userId=*",
          //   response: [],
          // });

          cy.visit("#");
          cy.contains("My Recent Products");
        });
        it("validate my one recent product", () => {
          cy.server();

          cy.route({
            method: "GET",
            url: "/assets/v1/manifests?userId=*",
            response: "fixture:recentProducts/oneRecentProduct.json",
          });

          cy.visit("#");
          cy.contains("My Recent Products");
        });

        it("validate my two recent products", () => {
          cy.server();

          cy.route({
            method: "GET",
            url: "/assets/v1/manifests?userId=*",
            response: "fixture:recentProducts/twoRecentProduct.json",
          });

          cy.visit("#");
          cy.contains("My Recent Products");
        });

        it("validate only 5 products are visable even though six are sent from the server", () => {
          cy.server();

          cy.route({
            method: "GET",
            url: "/assets/v1/manifests?userId=*",
            response: "fixture:recentProducts/sixRecentProduct.json",
          });

          cy.visit("#");
          cy.contains("My Recent Products");
        });
      });
    });
  });
});
