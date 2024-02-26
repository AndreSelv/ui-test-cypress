const UserPage = require("../../support/PageObjects/UserPage");
const userPage = new UserPage();
describe("US120353 Validate that user be able to search users in user page | Testing ", () => {

  beforeEach(() => {
    cy.initAmplify();
    cy.login();
    cy.visit("#/users");
  });

  it("US120353 Validate user search bar existing", () => {
    userPage.getUserSearchBar().should("be.visible");
  });

  it("US120353 Validate that CountLabel value equal length of the user list", () => {
    cy.wait(1000)
    userPage.getUserCountLabel().then($value => userPage.getListOfUsers().its("length")
      .should("equal", parseInt($value.text().match(/\(([^)]+)\)/)[1])));
  });

  it("US120353 Validate users search func return correct response", () => {
    let testData = "ANdrei";
    userPage.getUserSearchBar().should("be.visible").type(testData, { delay: 200 });
    userPage.getListOfUsers().each(($el) => expect($el.text().toLocaleLowerCase()).contains(testData.toLocaleLowerCase()));
    userPage.countLabelValidation()
  });


});
