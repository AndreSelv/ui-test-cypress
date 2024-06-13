const BrowsePage = require("../../../support/PageObjects/BrowsePage");
const ProductPage = require("../../../support/PageObjects/ProductPage");
const browsePage = new BrowsePage();
const productPage = new ProductPage();

describe("Validate Product page (AUTO) functionalities (Landing page)", () => {

  beforeEach(() => {
    cy.initAmplify();
    cy.login();
    cy.visit("#/product?q=farmag");
  });


  it("Validate Agricultural Commercial ExcessUmbrella Liability widgets persistence", () => {
    productPage.getAgriculturalCommercialExcessUmbrellaLiabilityTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate Agricultural General Liability widgets persistence", () => {
    productPage.getAgriculturalGeneralLiabilityTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate Agricultural Output Program widgets persistence", () => {
    productPage.getAgriculturalOutputProgramTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate Farm Inland Marine widgets persistence", () => {
    productPage.getFarmInlandMarineTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate Farm Properties widgets persistence", () => {
    productPage.getFarmPropertiesTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate Farm Umbrella widgets persistence", () => {
    productPage.getFarmUmbrellaTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate Farmowners widgets persistence", () => {
    productPage.getFarmownersTab().click({ force: true });
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