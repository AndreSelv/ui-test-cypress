const BrowsePage = require("../../support/PageObjects/BrowsePage");
const browsePage = new BrowsePage();
const HomePage = require("../../support/PageObjects/HomePage");
const { join } = require("path");
const homePage = new HomePage();


describe("Download Browser Results", () => {
  beforeEach(() => {
    cy.initAmplify();
    cy.login();
  });

  it("Validate download functionality from browse page", () => {
    cy.visit("#/browse");
    browsePage.selectProduct("BOP");
    // browsePage.selectMaterialType("Forms");
    browsePage.typeSearch("\"Field CL\"");
    browsePage.selectState("IA");
    browsePage.publicationsShouldBeGreaterThen(1);
    browsePage.getDownloadButton().should("be.enabled").click();
    cy.on("window:alert", (t) => expect(t).to.contains(browsePage.getDownloadAlertMessage()));
    browsePage.getAlertIAgreeButton().should("be.enabled");
    //TODO add trigger (push agree button) action for starting download process
    // and validation

    // cy.verifyDownload(".zip", { contains: true });
    // cy.task("deleteFolder", Cypress.config('downloadsFolder'));

  });

  it("Validate download functionality from Home page (Quick search)", () => {
    cy.visit("#");
    homePage.typeSearchBar("\"Field CL\"");
    browsePage.publicationsShouldBeGreaterThen(1);
    //TODO add validation after fix problem

    // browsePage.getDownloadButton().should("be.enabled").click();
    // cy.on("window:alert", (t) => {
    //   expect(t).to.contains(browsePage.getDownloadAlertMessage());
    // });
    // browsePage.getAlertIAgreeButton().should("be.enabled");
  });
})
;