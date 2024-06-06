const BrowsePage = require("../../../support/PageObjects/BrowsePage");
const ProductPage = require("../../../support/PageObjects/ProductPage");
const browsePage = new BrowsePage();
const productPage = new ProductPage();

describe("Validate Product page (AUTO) functionalities (Landing page)", () => {

  beforeEach(() => {
    cy.initAmplify();
    cy.login();
    cy.visit("#/product?q=auto");
  });

  it("Validate Commercial auto widgets persistence", () => {
    productPage.getCommercialAutoTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate Personal auto widgets persistence", () => {
    productPage.getPersonalAutoTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));

  });
  it("Validate Non Standard auto widgets persistence", () => {
    productPage.getPersonalAutoNonStandardTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
});

