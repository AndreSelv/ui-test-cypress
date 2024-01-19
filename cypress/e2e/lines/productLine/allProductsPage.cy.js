const BrowsePage = require("../../../support/PageObjects/BrowsePage");
const HomePage = require("../../../support/PageObjects/HomePage");
const LinesPage = require("../../../support/PageObjects/LinesPage");
const linesPage = new LinesPage();
const browsePage = new BrowsePage();
const homePage = new HomePage();
describe("Validate all functionality on the ALL products line pages", () => {
  beforeEach(() => {
    cy.initAmplify();
    cy.login();
    cy.visit("#/lines/All");

  });
  it("US118446 All product lines page validation", () => {
    cy.url().should("include", "/#/lines/All");
    cy.contains("Download Latest All Program Materials");
    cy.contains("My Recent All Downloads");
    cy.contains("Download Latest All Files List (.csv)");
    cy.contains("Program Materials");
    cy.contains("Recent Changes");
  });
  it("US118446 All product lines page validation", () => {
    cy.url().should("include", "/#/lines/All");
    cy.contains("Recent Changes").should("be.visible").click();
    cy.contains("Program Materials").should("be.visible").click();
    cy.contains("Download Latest All Program Materials");
  });

  it("Expand Download Latest All Program Materials section", () => {
    linesPage.getExpandedSection().should("not.exist");
    linesPage.getMoreButton().click();
    linesPage.getExpandedSection().should("exist");
    linesPage.getLessButton().click();
    linesPage.getExpandedSection().should("not.exist");

  });

  it("Expand Download Latest All Files section", () => {
    linesPage.getExpandedSection().should("not.exist");
    linesPage.getMoreButton(2).click();
    linesPage.getExpandedSection().should("exist");
    linesPage.getLessButton().click();
    linesPage.getExpandedSection().should("not.exist");
  });

});
