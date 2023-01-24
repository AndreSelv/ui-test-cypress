describe("Browse Results for Product, 1 State, Loss Cost and Current Status", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });

        it("US74540 validate browse search card more, product line correct and less", () => {
          cy.server();

          cy.route({
            method: "POST",
            url: "/assets/v1/search",
            response: "fixture:browse/browseResultsRendering.json",
          });

          cy.visit("#/browse");
          cy.get("[data-test=browseProduct]").click();
          cy.get('[data-value="YT"]').click();

          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectCO]").click();

          cy.get("[data-test=packageType]").click();
          cy.get('[data-value="PLC"]').click();

          cy.get("[data-test=status]").click();
          cy.get('[data-value="Externally Approved"]').click();

          cy.contains("ProductStateLossCostCurrent").click();
          cy.contains("close").click();
          cy.contains("more").click();
          cy.get("[data-test=browseResults-item-0-product-chip]").should(
            "have.css",
            "background-color",
            "rgb(31, 66, 135)"
          );
          cy.contains("less").click();
        });

        it("US74540 validate browse search card tooltips", () => {
          cy.server();

          cy.route({
            method: "POST",
            url: "/assets/v1/search",
            response: "fixture:browse/browseResultsRendering.json",
          });

          cy.visit("#/browse");
          cy.get("[data-test=browseProduct]").click();
          cy.get('[data-value="YT"]').click();

          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectCO]").click();

          cy.get("[data-test=packageType]").click();
          cy.get('[data-value="PLC"]').click();

          cy.get("[data-test=status]").click();
          cy.get('[data-value="Externally Approved"]').click();
          cy.get("[data-test=browseResults-item-0-line-badge]").should(
            "contain",
            "1"
          );
          cy.get("[data-test=browseResults-item-0-line-icon]").trigger(
            "mouseover"
          );
          cy.get("[data-test=browseResults-item-0-line-tooltip]").should(
            "contain",
            "Product Lines"
          );
          cy.get("[data-test=browseResults-item-0-line-icon]").trigger(
            "mouseout"
          );
          cy.get("[data-test=browseResults-item-0-state-badge]").should(
            "contain",
            "53"
          );
          cy.get("[data-test=browseResults-item-0-state-icon]").trigger(
            "mouseover"
          );
          cy.get("[data-test=browseResults-item-0-state-tooltip]").should(
            "contain",
            "YT states"
          );
          cy.get("[data-test=browseResults-item-0-state-icon]").trigger(
            "mouseout"
          );
          cy.get("[data-test=browseResults-item-0-lossCost-icon]").trigger(
            "mouseover"
          );
          cy.get("[data-test=browseResults-item-0-lossCost-tooltip]").should(
            "contain",
            "Loss Cost"
          );
          cy.get("[data-test=browseResults-item-0-lossCost-icon]").trigger(
            "mouseout"
          );
          cy.get(
            "[data-test=browseResults-item-0-externallyApproved-icon]"
          ).trigger("mouseover");
          cy.get(
            "[data-test=browseResults-item-0-externallyApproved-tooltip]"
          ).should("contain", "Current");
          cy.get(
            "[data-test=browseResults-item-0-externallyApproved-icon]"
          ).trigger("mouseout");
        });

        it("US74540 validate browse search card download", () => {
          cy.server();

          cy.route({
            method: "POST",
            url: "/assets/v1/search",
            response: "fixture:browse/browseResultsRendering.json",
          });

          cy.visit("#/browse");
          cy.get("[data-test=browseProduct]").click();
          cy.get('[data-value="YT"]').click();

          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectCO]").click();

          cy.get("[data-test=packageType]").click();
          cy.get('[data-value="PLC"]').click();

          cy.get("[data-test=status]").click();
          cy.get('[data-value="Externally Approved"]').click();
          cy.get("[data-test=browseScreen-item-download-button]");
        });
      });
    });
  });
});
