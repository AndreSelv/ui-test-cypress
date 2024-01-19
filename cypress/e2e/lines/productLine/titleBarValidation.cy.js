const LinesPage = require("../../../support/PageObjects/LinesPage");
const linesPage = new LinesPage();

describe("Title bar testing", () => {
  beforeEach(() => {
    cy.initAmplify();
    cy.login();
  });

  it("Title bar collapse and expand", () => {
    cy.visit("#/lines/All");
    linesPage.getTitleBarSection().should("have.not.class", "Mui-expanded");
    linesPage.getTitleBar().click();
    linesPage.getTitleBarSection().should("have.class", "Mui-expanded");
    linesPage.getTitleBar().click();
  });
});
