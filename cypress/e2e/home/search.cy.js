const BrowsePage = require("../../support/PageObjects/BrowsePage");
const browsePage = new BrowsePage();
describe("Search Functionality", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.visit("/#/browse");
          cy.viewport(size, orientation);
          cy.clearAllCookies()
        });
        const noSpase = "CL0811";
        const spase = "CL 0811";
        const trim = " CL 0811 ";
        it("enter a product in the search box and vailidate information returns", () => {
          // cy.intercept("POST", "/assets/v1/search", { fixture: "browse/browseResultsVariousCards.json" });
          cy.visit("/#/browse");
          browsePage.typeSearch("Liability");
          cy.url().should("contain", "/#/browse");
          browsePage.selectProduct("AGXL");
          browsePage.selectState("AL");
          browsePage.selectMaterialType("Forms");
          browsePage.getListOfPublicationsCards().each(($el) => {
            expect($el.text()).contains("Liability");
          });
        });

        it("US113741 AAISdirect | Support search box searches space usage (feature parity) from home page", () => {
          browsePage.typeSearch(spase);
          cy.wait(1000);
          cy.url().should("contain", "/#/browse");
          browsePage.publicationsShouldBeEqual(2);
          browsePage.getSearchField().clear();
          browsePage.typeSearch(noSpase);
          browsePage.publicationsShouldBeEqual(2);
          browsePage.getListOfPublicationsCards().each(($el) => {
            expect($el.text()).contains(spase);
          });
        });

        it("US113741 AAISdirect | Support search box searches space usage (feature parity) ", () => {
          browsePage.typeSearch(noSpase);
          cy.wait(1000);
          cy.url().should("contain", "/#/browse");
          browsePage.publicationsShouldBeEqual(2);
          browsePage.getSearchField().clear();
          browsePage.typeSearch(spase);
          browsePage.publicationsShouldBeEqual(2);
          browsePage.getListOfPublicationsCards().each(($el) => {
            expect($el.text()).contains(spase);
          });
        });

        it("US113741 AAISdirect | Support search box searches space usage (feature parity) from browser page", () => {
          browsePage.typeSearch(spase);
          browsePage.selectProduct("AGGL");
          browsePage.selectMaterialType("Forms", "Advisory Information");
          browsePage.selectState("AK");
          browsePage.getListOfPublicationsCards().each(($el) => {
            expect($el.text()).contains(spase);
          });
        });

        it("US113741 AAISdirect | Support search box searches space usage (feature parity)", () => {
          browsePage.typeSearch(noSpase);
          browsePage.selectProduct("AGGL");
          browsePage.selectMaterialType("Forms", "Advisory Information");
          browsePage.selectState("AK");
          browsePage.getListOfPublicationsCards().each(($el) => {
            expect($el.text()).contains(spase);
          });

        });
        it("US113741 AAISdirect | Support search box searches space usage (feature parity) Trim leading and trailing spaces", () => {
          browsePage.getExactWordSearchCheckBox().click().should("not.be.checked");
          browsePage.typeSearch(trim);
          cy.wait(1000);
          cy.url().should("contain", "/#/browse");
          browsePage.publicationsShouldBeEqual(2);
          browsePage.getListOfPublicationsCards().each(($el) => {
            expect($el.text()).contains(spase);
          });
        });
      });
    });
  });
});
