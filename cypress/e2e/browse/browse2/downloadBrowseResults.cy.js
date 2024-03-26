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
  it("US119956 Bulk download section persistence", () => {
    browsePage.getRecentDownloadsSection().should("not.exist");
    browsePage.getRecentDownloadsButton().should("be.visible").click();
    browsePage.getRecentDownloadsSection().should("be.visible").contains("File:");
    cy.contains("No recent download").should("not.exist");
  });
  it("US119956 No Recent download persistence", () => {
    browsePage.selectProduct("GS");
    browsePage.getRecentDownloadsSection().should("not.exist");
    browsePage.getRecentDownloadsButton().should("be.visible").click();
    cy.wait(3000);
    cy.contains("No recent download").should("be.visible");
  });

  it("Validate download functionality from browse page", () => {
    browsePage.typeSearch("\"Field CL\"");
    browsePage.getExcludeFileContentCheckBox().click();
    browsePage.selectProduct("BOP");
    // browsePage.selectMaterialType("Forms");
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
    browsePage.getDownloadButton().should("be.enabled").click({ force: true });
    cy.on("window:alert", (t) => {
      expect(t).to.contains(browsePage.getDownloadAlertMessage());
    });
    browsePage.getAlertIAgreeButton().should("be.enabled").click();
    cy.contains(browsePage.getGoToDownloadPageMessage(), { timeout: 35000 }).should("be.visible");
    browsePage.getGoToSeDownloadSectionOnTheLeftButton().should("be.visible").click();
    cy.url().should("include", "/#/browse");
    cy.contains("Recent Downloads");
  });

  it("US118250 Disable the download button when results exceed 1,000", () => {
    const toolTip = "Search results must be less than 1,000 to download. Please filter your results further.";
    browsePage.testToolTip(browsePage.getDownloadButton(), toolTip);
    browsePage.selectMaterialType("Advisory Information");
    browsePage.getDownloadButton().trigger("mouseover", { force: true });
    cy.contains(toolTip).should("not.exist");
  });
  it("US118250 Disable the download button when results exceed 1,000", () => {
    const toolTip = "Search results must be less than 1,000 to download. Please filter your results further.";
    browsePage.testToolTip(browsePage.getDownloadButton(), toolTip);
    // browsePage.selectMaterialType("Advisory Information");
    browsePage.getDownloadButton().trigger("mouseover", { force: true });
    cy.contains(toolTip).should("be.visible");
  });


});