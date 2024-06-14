const BrowsePage = require("../../../support/PageObjects/BrowsePage");
const ProductPage = require("../../../support/PageObjects/ProductPage");
const browsePage = new BrowsePage();
const productPage = new ProductPage();

describe("Validate Product page (Inland Marine) functionalities (Landing page)", () => {

  beforeEach(() => {
    cy.initAmplify();
    cy.login();
    cy.visit("#/product?q=inlandmarine");
  });


  it("Validate Agricultural Commercial ExcessUmbrella Liability widgets persistence", () => {
    productPage.getInlandMarineGuideNonfiledTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });


  it("Validate List of the Commercial products", () => {
    productPage.getListOfProducts().each(($elm) => {
      cy.wait(1500);
      cy.get($elm).click({ force: true });
      productPage.getListOfCards().forEach((el) => el.should("be.visible"));
    });
  });
});