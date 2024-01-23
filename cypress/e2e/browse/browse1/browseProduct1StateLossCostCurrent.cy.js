const BrowsePage = require("../../../support/PageObjects/BrowsePage");
const browsePage = new BrowsePage();

describe("Browse Results for Product, 1 State, Loss Cost and Current Status", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.visit("#/browse");
        });

        it("US74540 validate browse search card more, product line correct and less", () => {
          browsePage.selectProduct("HO");
          browsePage.selectState("AL");
          browsePage.selectMaterialType("Forms");
          browsePage.getBrowseResultLineIcon(1).click();
          browsePage.getExpandedSection().should("be.visible");
          browsePage.getBrowseResultStateIcon(1).click();
          browsePage.getExpandedSection().should("not.exist");
        });

        it.skip("US74540 validate browse search card tooltips", () => {
          cy.visit("#/browse");
          browsePage.selectProduct("HO");
          browsePage.selectState("AL");
          browsePage.selectMaterialType("Advisory Information");


          browsePage.getBrowseResultLineBadge().should(
            "contain",
            "1",
          );
          browsePage.getBrowseResultLineIcon().trigger(
            "mouseover",
          );
          browsePage.getBrowseResultLineTooltip().should(
            "contain",
            "Product Lines",
          );
          browsePage.getBrowseResultLineIcon().trigger(
            "mouseout",
          );
          browsePage.getBrowseResultStateBadge().should(
            "contain",
            "2",
          );
          browsePage.getBrowseResultStateIcon().trigger(
            "mouseover",
          );
          browsePage.getBrowseResultStateTooltip().should(
            "contain",
            "HO states",
          );
          browsePage.getBrowseResultStateIcon().trigger(
            "mouseout",
          );
          // cy.get("[data-test=browseResults-item-0-lossCost-icon]").trigger(
          //   "mouseover",
          // );
          // cy.get("[data-test=browseResults-item-0-lossCost-tooltip]").should(
          //   "contain",
          //   "Loss Cost",
          // );
          // cy.get("[data-test=browseResults-item-0-lossCost-icon]").trigger(
          //   "mouseout",
          // );
          // cy.get(
          //   "[data-test=browseResults-item-0-externallyApproved-icon]",
          // ).trigger("mouseover");
          // cy.get(
          //   "[data-test=browseResults-item-0-externallyApproved-tooltip]",
          // ).should("contain", "Current");
          // cy.get(
          //   "[data-test=browseResults-item-0-externallyApproved-icon]",
          // ).trigger("mouseout");
          // cy.get(".MuiCardHeader-subheader").should("be.visible");
        });

        it("US98489 validate browse search bulletins card has document preview display", () => {
          browsePage.selectProduct("HO");
          browsePage.selectState("AL");
          browsePage.selectMaterialType("Bulletins");
          browsePage.getListOfPublicationsCards().should("have.length.greaterThan", 1);
        });

        it("US118250 Validate tooltip for Product icon", () => {
          const toolTip = "Product";
          browsePage.testToolTip(browsePage.getBrowseResultStateBadge(), toolTip);
        });

        it("US118250 Validate tooltip for State icon", () => {
          const toolTip = "Jurisdiction";
          browsePage.testToolTip(browsePage.getBrowseResultStateBadge(), toolTip);
        });

        it("US118250 Validate tooltip for Info icon", () => {
          const toolTip = "More Info";
          browsePage.testToolTip(browsePage.getInfoIcon(), toolTip);
        });
        it("US118250 Validate tooltip for Download icon", () => {
          const toolTip = "Download";
          browsePage.testToolTip(browsePage.getDownloadIcon(), toolTip);
        });
      });
    });
  });
});
