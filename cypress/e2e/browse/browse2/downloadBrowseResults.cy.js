const BrowsePage = require("../../../support/PageObjects/BrowsePage");
const browsePage = new BrowsePage();
const HomePage = require("../../../support/PageObjects/HomePage");
const homePage = new HomePage();


describe("Download Browser Results", () => {
  beforeEach(() => {
    cy.initAmplify();
    cy.login();
    cy.visit("#/browse");
  });

  it("Validate download functionality from browse page", () => {
    browsePage.getExcludeFileContentCheckBox().click();
    browsePage.selectProduct("BOP");
    // browsePage.selectMaterialType("Forms");
    browsePage.typeSearch("\"Field CL\"");
    browsePage.selectState("IA");
    browsePage.publicationsShouldBeGreaterThen(1);
    browsePage.getDownloadButton().should("be.enabled").click();
    cy.on("window:alert", (t) => {
      expect(t).to.contains(browsePage.getDownloadAlertMessage());
    });
    browsePage.getAlertIAgreeButton().should("be.enabled");
    //TODO
    // cy.task("countFiles", "cypress/downloads").then((count) => {
    //   expect(count).eqls(1);
    // });
  });

  it("Validate download functionality from Home page (Quick search)", () => {
    browsePage.typeSearch("\"Field CL\"");
    browsePage.getExcludeFileContentCheckBox().click();
    browsePage.publicationsShouldBeGreaterThen(1);
    //TODO add validation after fix problem

    // browsePage.getDownloadButton().should("be.enabled").click();
    // cy.on("window:alert", (t) => {
    //   expect(t).to.contains(browsePage.getDownloadAlertMessage());
    // });
    // browsePage.getAlertIAgreeButton().should("be.enabled");
  });

  it("US118911 Download Manifests for no Line or State validation", () => {
    browsePage.selectMaterialType("Advisory Information");
    browsePage.publicationsShouldBeGreaterThen(60);
    browsePage.getDownloadButton().should("be.enabled").click();
    cy.on("window:alert", (t) => {
      expect(t).to.contains(browsePage.getDownloadAlertMessage());
    });
    browsePage.getAlertIAgreeButton().should("be.enabled").click();
    cy.contains(browsePage.getGoToDownloadPageMessage(), { timeout: 35000 }).should("be.visible");
    browsePage.getGoToDownloadPageButton().should("be.visible").click();
    cy.url().should("include", "/#/lines/All");
    cy.contains("My Recent All Downloads");
  });
});