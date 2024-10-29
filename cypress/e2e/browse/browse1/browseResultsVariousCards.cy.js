const BrowsePage = require("../../../support/PageObjects/BrowsePage");
const browsePage = new BrowsePage();
const HomePage = require("../../../support/PageObjects/HomePage");
const MATERIALS = require("../../../fixtures/enums/MATERIALS");
const CATEGORIES = require("../../../fixtures/enums/CATEGORIES");
const homePage = new HomePage();

let x = Math.floor((Math.random() * 10) + 1);
describe("Browse Results for Various Cards", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });
        it("US112937 Show material type by name rather than symbol in search results", () => {
          cy.visit("#/browse");
          browsePage.getMaterial().click({ force: true });
          for (let i = 0; i < MATERIALS.length; i++) {

            browsePage.getAllCheckBox()
              .as("checkboxes").check(MATERIALS[i][0], { force: true });
            browsePage.getMaterial().click({ force: true });
            browsePage.getMaterialTypeSection().should("contain.text", MATERIALS[i][0]);
            cy.wait(1000);
            browsePage.getListOfPublicationsCards().each(($el) => {
              expect($el.text()).contains(CATEGORIES[i]);
            });
            browsePage.getMaterial().click({ force: true });
            cy.get(`@checkboxes`).uncheck(MATERIALS[i][0], { force: true });
            cy.wait(1000);
          }
        });

        it("US114431 Show user where docs is available", () => {
          cy.visit("#/browse");
          browsePage.selectProduct("BOP");
          browsePage.selectState("AL");
          browsePage.selectMaterialType("Forms");
          cy.wait(500);
          browsePage.getInfoIcon(1).should("be.visible").click({ force: true });
        });

        it("US115255 Alphabetize product lines within More tile dropdown", () => {
          cy.visit("#/browse");
          browsePage.selectProduct("AGXL");
          browsePage.selectState("AL");
          browsePage.getBrowseResultLineIcon(x).click({ force: true });
          browsePage.getListOfProductLinesInCard().then($elements => {
            const strings = [...$elements].map(el => el.innerText);
            const sortedLines = strings.sort((a, b) => {
              if (a.toLowerCase() > b.toLowerCase()) return 1;
              else if (a.toLowerCase() < b.toLowerCase()) return -1;
              return 0;
            });
            expect(strings).to.deep.equal(sortedLines);
          });
        });

        it("US115255 Alphabetize states within More tile dropdown", () => {
          cy.visit("#/browse");
          browsePage.selectProduct("AGXL");
          browsePage.selectState("AL");
          browsePage.getBrowseResultLineIcon(x).click({ force: true });

          browsePage.getListOfStatesInCard().then($elements => {
            const strings = [...$elements].map(el => el.innerText);
            expect(strings).to.deep.equal([...strings].sort());
          });
        });

        it("Validate that user can open single docs publication  ", () => {
          cy.visit("#/browse");
          browsePage.typeSearch("\"NM PAN\"");
          browsePage.getExcludeFileContentCheckBox().click({ force: true });
          browsePage.selectPublicationByNumber(7);
          browsePage.getDialogWindows().should("be.visible");
        });

        it("Validate that user can open multiple docs publication  ", () => {
          cy.visit("#/browse");
          browsePage.getExactWordSearchCheckBox().click({ force: true });
          browsePage.typeSearch("\"PA 4502\"");
          browsePage.selectPublicationByNumber(1);
          // browsePage.getRadioGroupSection().should("be.visible");
          // browsePage.selectDocsByRadioButton(1).click();
          browsePage.getDialogWindows().should("be.visible");
        });

        it("Validate error message if publication does not have any PDF docs ", () => {
          cy.visit("#/browse");
          browsePage.typeSearch("MT PA Download REV");
          // browsePage.selectProduct("HO");
          // browsePage.selectState("AZ");
          // browsePage.selectPlans("By Peril");
          browsePage.selectPublicationByNumber(1);
          cy.contains(browsePage.getNoAvailablePreviewFiles());
          cy.on("window:alert", (t) => {
            expect(t).to.contains(browsePage.getNoAvailablePreviewFiles());
          });
        });

        it("Validate that user can open docs in Info", () => {
          cy.visit("#/browse");
          browsePage.typeSearch("\"PA 4502\"");
          browsePage.getExcludeFileContentCheckBox().click({ force: true });
          cy.wait(1000);
          browsePage.getInfoIcon(1).click({ force: true });
          // browsePage.selectPublicationByNumber(5);
          browsePage.getDialogWindows().should("be.visible");
          browsePage.getRowDisplay("PA", "Delaware").invoke("removeAttr", "target").click();
          cy.wait(2000);
        });
      });
    });
  });
});
