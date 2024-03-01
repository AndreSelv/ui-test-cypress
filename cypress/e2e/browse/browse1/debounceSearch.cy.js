const BrowsePage = require("../../../support/PageObjects/BrowsePage");
const browsePage = new BrowsePage();
describe("Browse Screen: Filters", () => {
  beforeEach(() => {
    cy.initAmplify();
    cy.login();
    cy.visit("#/browse");
  });
  it("US120384 Validate that time between keystroke not greater than 500 milliseconds", () => {

    browsePage.getBrowseCountResultField().then(($count) => {
      let text = "PA4502";
      let count = parseInt($count.text().substring(0, $count.text().indexOf(" ")));
      for (let i = 0; i < text.length; i++) {
        browsePage.getBrowseCountResultField().then(($actualCount) => {
          let actCount = parseInt($actualCount.text().substring(0, $actualCount.text().indexOf(" ")));
          browsePage.getSearchField().type(text[i], {delay: 300});
          expect(count).eq(actCount);
        });
      }
    });
    // browsePage.getSearchField().type("PA4502", {delay: 499});
  });
});