const HomePage = require("../../support/PageObjects/HomePage");
const BrowsePage = require("../../support/PageObjects/BrowsePage");
const homePage = new HomePage();
const browsePage = new BrowsePage();
const TESTS = require("../../fixtures/enums/TESTS");
describe("Search Functionality", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.visit("/#/browse");
          cy.viewport(size, orientation);
          cy.clearCookies();
        });

        it("US114519 Accommodate form and bulletin searches more intelligently", () => {

          cy.wrap(TESTS).each((test) => {
            browsePage.typeSearch(test.case);
            browsePage.publicationsShouldBeEqual(test.result);
            browsePage.getListOfPublicationsCards().each(($el) => {
              expect($el.text()).contains(test.expect);
            });
          });
        });

        it("US114519 Accommodate form and bulletin searches more intelligently Quotes", () => {
          browsePage.getExactWordSearchCheckBox().click().should("be.not.checked");
          cy.wrap(TESTS).each((test) => {
            browsePage.typeSearch(test.caseQuotes);
            browsePage.publicationsShouldBeEqual(test.result);
            browsePage.getListOfPublicationsCards().each(($el) => {
              expect($el.text()).contains(test.expect);
            });
          });
        });

        it("US126743 Validate exact phrase searches explicit", () => {
          browsePage.getExactWordSearchCheckBox().should("be.checked");
          browsePage.getExcludeFileContentCheckBox().should("be.not.checked");
          browsePage.typeSearch("severability");
          browsePage.getResultFromBar().then(($actualCount) => {
            let actCount = parseInt($actualCount.text().substring(0, $actualCount.text().indexOf(" ")));
            expect(actCount).eq(0);
          });
        });

        it("US126743 Validate exact phrase searches explicit with Exclude content option", () => {
          browsePage.getExactWordSearchCheckBox().should("be.checked");
          browsePage.getExcludeFileContentCheckBox().should("be.not.checked");
          browsePage.getExcludeFileContentCheckBox().click()
          browsePage.typeSearch("severability");
          browsePage.getResultFromBar().then(($actualCount) => {
            let actCount = parseInt($actualCount.text().substring(0, $actualCount.text().indexOf(" ")));
            expect(actCount).eq(278);
          });
        });

        it("US126743 Validate exact phrase searches explicit with semi quotes", () => {
          browsePage.getExactWordSearchCheckBox().should("be.checked");
          browsePage.getExcludeFileContentCheckBox().should("be.not.checked");
          browsePage.typeSearch(`"severability"`);
          browsePage.getResultFromBar().then(($actualCount) => {
            let actCount = parseInt($actualCount.text().substring(0, $actualCount.text().indexOf(" ")));
            expect(actCount).eq(0);
          });
        });

        it("US126743 Validate exact phrase searches explicit with checkbox", () => {
          browsePage.getExactWordSearchCheckBox().should("be.checked");
          browsePage.getExcludeFileContentCheckBox().should("be.not.checked");
          browsePage.typeSearch(`Total Loss`);
          browsePage.getResultFromBar().then(($actualCount) => {
            let actCount = parseInt($actualCount.text().substring(0, $actualCount.text().indexOf(" ")));
            expect(actCount).eq(1);
            browsePage.getListOfPublicationsCards().each(($el) => {
              expect($el.text()).contains("Total Loss");
            });
          });
        });

        it("US126743 Validate exact phrase searches explicit with checkbox", () => {
          browsePage.getExactWordSearchCheckBox().should("be.checked");
          browsePage.getExcludeFileContentCheckBox().should("be.not.checked");
          browsePage.typeSearch(`Loss Cost`);
          browsePage.getResultFromBar().then(($actualCount) => {
            let actCount = parseInt($actualCount.text().substring(0, $actualCount.text().indexOf(" ")));
            // expect(actCount).eq(1);
            browsePage.getListOfPublicationsCards().each(($el) => {
              expect($el.text()).contains("Loss Cost");
            });
          });
        });
      });
    });
  });
});
