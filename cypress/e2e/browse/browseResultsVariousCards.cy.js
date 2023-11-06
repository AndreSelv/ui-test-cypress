const BrowsePage = require("../../support/PageObjects/BrowsePage");
const browsePage = new BrowsePage();
const HomePage = require("../../support/PageObjects/HomePage");
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

        it("US114431 Show user where docs is available", () => {
          cy.visit("#/browse");
          browsePage.selectProduct("BOP");
          browsePage.selectState("AL");
          browsePage.selectMaterialType("Forms");
          cy.wait(500);
          browsePage.getInfoIcon(1).should("be.visible").click();
          // cy.scrollTo("top");
          // browsePage.getInfoIcon(2).wait(1000).invoke("removeAttr", "target").click();
          // cy.get(".MuiDialogContent-root").should("be.visible");
        });

        it("US115255 Alphabetize product lines within More tile dropdown", () => {
          cy.visit("#/browse");
          browsePage.selectProduct("AGXL");
          browsePage.selectState("AL");
          browsePage.getMoreButton(x).click();
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
          browsePage.getMoreButton(x).click();

          browsePage.getListOfStatesInCard().then($elements => {
            const strings = [...$elements].map(el => el.innerText);
            expect(strings).to.deep.equal([...strings].sort());
          });
        });

        it("Validate that user can open single docs publication  ", () => {
          cy.visit("#");
          homePage.typeSearchBar("\"PA 4502\"");
          browsePage.selectPublicationByNumber(5);
          browsePage.getDialogWindows().should("be.visible");
        });

        it("Validate that user can open multiple docs publication  ", () => {
          cy.visit("#");
          homePage.typeSearchBar("\"PA 4502\"");
          browsePage.selectPublicationByNumber(1);
          // browsePage.getRadioGroupSection().should("be.visible");
          // browsePage.selectDocsByRadioButton(1).click();
          browsePage.getDialogWindows().should("be.visible");
        });

        it("Validate error message if publication does not have any PDF docs ", () => {
          cy.visit("#/browse");
          browsePage.selectProduct("HO");
          browsePage.selectState("AZ");
          browsePage.selectPlans("By Peril");
          browsePage.selectPublicationByNumber(1);
          cy.contains(browsePage.getNoAvailablePreviewFiles());
          cy.on("window:alert", (t) => {
            expect(t).to.contains(browsePage.getNoAvailablePreviewFiles());
          });
        });

        it.only("Validate that user can open docs in Info", () => {
          cy.visit("#");
          homePage.typeSearchBar("\"PA 4502\"");
          browsePage.getInfoIcon(1).click();
          // browsePage.selectPublicationByNumber(5);
          browsePage.getDialogWindows().should("be.visible");
          browsePage.getRowDisplay("PA", "Nebraska").invoke('removeAttr','target').click();
          cy.wait(2000);




          // cy.visit('https://mozilla.github.io')

          // cy.window().its('open').should('be.called')



          cy.window().then((win) => {
            cy.stub(win, "open", url =>{
              win.location.href = "https://mozilla.github.io"

            }).as("windowOpen");

            cy.get("@windowOpen").should("be.visible")

            cy.get("@windowOpen").should("be.called");
            cy.url().should("include", "mozilla");


            // cy.get('#viewer').should('be.visible')

          });

          // cy.get('@windowOpen').should("be.visible")

          // cy.url()
          //   .should("include", "/windows/new");
        });
      });
    });
  });
});
