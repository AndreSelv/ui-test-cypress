const LINES = require("../../fixtures/enums/LINES");
const STATES = require("../../fixtures/enums/STATES");
const BrowsePage = require("../../support/PageObjects/BrowsePage");
const browsePage = new BrowsePage();


describe("Brows Results Summary", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.viewport(size, orientation);
        });

        it("validate browser result with all parameters", () => {
          cy.visit("#/browse");
          browsePage.selectProduct("HO");
          // browsePage.selectState(browsePage.getRandomState(STATES));
          browsePage.selectMaterialType("Forms");
          browsePage.setFromDateField("10/02/2012");
          browsePage.setToDateField("10/09/2023");
          browsePage.typeSearch("Losses");
          browsePage.selectState("AL");
          browsePage.publicationsShouldBeEqual(4);
        });

        it("validate no browse each results", () => {
          cy.visit("#/browse");
          browsePage.selectProduct("YT");
          browsePage.typeSearch("waterr");
          browsePage.selectState("CO");
          cy.contains("0 results");
        });

        it("validate browse search returns 1 result", () => {
          cy.visit("#/browse");
          browsePage.selectProduct("AGXL");
          browsePage.selectMaterialType("Forms and Endorsements List");
          browsePage.typeSearch("\"09 30 11\"");
          browsePage.selectState("PA");
          cy.contains("1 results");
        });

        it("validate browse search returns more than 1 result", () => {
          cy.visit("#/browse");
          browsePage.selectProduct("YT");
          browsePage.selectState("CO");
          cy.contains("135 results").wait(3000);
        });

        it.skip("validate download button functionality", () => {
          // cy.intercept("POST", "/assets/v1/search", { fixture: "browse/largeAmountData.json" });
          cy.visit("#/browse");
          browsePage.selectProduct("HO");
          browsePage.selectMaterialType("Forms");
          browsePage.selectState("IA");
          cy.contains(`1084 results`);
          cy.get("[data-test=\"browseScreen-item-download-button\"]").should("be.enabled");
          cy.get("[data-test=\"browseScreen-item-download-button\"]").click();
          cy.get(".MuiDialogActions-root > .MuiButton-textPrimary").click();
          cy.contains("Downloading Content").should("be.visible");

          //cy.task("deleteFolder", Cypress.config("downloadsFolder"));
          //cy.contains("Downloading Content").should("not.be.visible").end();
          //cy.readFile("cypress\\downloads\\AAIS.zip").should("exist");

          // cy.task('countFiles', 'cypress/downloads').then((count) => {
          //   expect(count).eqls(1);
          // })

        });
        it.skip("TC4941 Validate that download modal contains download link", () => {
          // cy.intercept("POST", "/assets/v1/search", { fixture: "browse/largeAmountData.json" });
          cy.visit("#/browse");
          browsePage.selectProduct("HO");
          browsePage.selectState("IA");
          cy.get("[data-test=\"browseScreen-item-download-button\"]").click();
          cy.get(".MuiDialogActions-root > .MuiButton-textPrimary").click();
          cy.contains("Downloading Content", { timeout: 20000 }).should("be.visible");
          cy.contains("Go To Download Page", { timeout: 70000 }).should("be.visible");
        });


        it("validate that effective date is persist on the search filter", () => {
          cy.visit("#/browse");
          browsePage.getFromDateField().click({ force: true });
          browsePage.getCalendarPicker().should("be.visible");
        });

        it("validate that oldest date is persist on the search filter", () => {
          cy.visit("#/browse");
          browsePage.getToDateField().click({ force: true });
          browsePage.getCalendarPicker().should("be.visible");
        });

        it("validate that browser result page contains all results depends on screen resolutions", () => {
          // cy.intercept("POST", "/assets/v1/search", { fixture: "browse/largeAmountData.json" });
          cy.viewport(3000, 2500);
          cy.visit("#/browse");
          browsePage.selectProduct("HO");
          browsePage.selectState("IA");
          browsePage.publicationsShouldBeGreaterThen(60);
          browsePage.circleShouldBeVisible();
        });

        it("US112654 Validate visibility form and edition numbers in the Forms", () => {

          cy.visit("#/browse");
          browsePage.selectProduct("AGXL");
          browsePage.selectMaterialType("Forms");
          browsePage.selectAllStates();

          cy.xpath(`//div[contains(@class, "infinite-scroll-component ")]//p`).each(($el) => {
            //First 2 characters should contain UpperCase Letters only
            expect($el.text().substring(0, 2), `First 2 characters should be Letter and Upper case - ${$el.text()}`).to.match(/^[A-Z]+$/);
            //Numbers and editions validations it should contain digits and spaces only
            expect($el.text().substring(3, 13), `Publications should contains Form and edition numbers - ${$el.text().substring(3, 13)}`).to.match(/^[\d ]*$/);
          });
        });

        it.skip("Validate visibility form and edition numbers in the Forms for All Product Lines", () => {
          cy.visit("#/browse");
          browsePage.selectAllStates();
          browsePage.selectMaterialType("Forms");
          cy.wrap(LINES).each((line) => {
            browsePage.selectProduct(line.key);
            browsePage.getProductSection().should("contain.text", line.title);
            browsePage.getBrowseCountResultField().each(($el) => {
              if ($el.text().substring(0, 1) !== "0") {
                browsePage.getListOfPublicationsCards().each(($el) => {
                  // expect(/^[A-Za-z\s]*$/.test($el.text().substring(0, 3))).eq(true);
                  // expect(/^\d+$/.test($el.text().substring(3, 7)), `Publications - ${$el.text()}`).eq(true);
                  expect($el.text().substring(0, 2), `First 2 characters ${$el.text().substring(0, 2)}`).to.match(/^[A-Za-z\s]*$/);
                  // expect($el.text().substring(3, 13), `Publications - ${$el.text()}`).to.match(/^[\d ]*$/);
                  expect($el.text().substring(0, 2), `Publications - ${$el.text()}`).to.match(/^[A-Z]+$/);
                });
              }
            });
            browsePage.getCloseProductsButton().click({ force: true });
          });
        });
      });
    });
  });
});
