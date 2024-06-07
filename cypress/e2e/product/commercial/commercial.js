const BrowsePage = require("../../../support/PageObjects/BrowsePage");
const ProductPage = require("../../../support/PageObjects/ProductPage");
const browsePage = new BrowsePage();
const productPage = new ProductPage();

describe("Validate Product page (Commercials) functionalities (Landing page)", () => {

  beforeEach(() => {
    cy.initAmplify();
    cy.login();
    cy.visit("#/product?q=commercial");
  });

  it("Validate Artisans widgets persistence", () => {
    productPage.getArtisansTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate Businessowners widgets persistence", () => {
    productPage.getBusinessownersTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate CannabisBusinessowners widgets persistence", () => {
    productPage.getCannabisBusinessownersTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate CombinationPolicyProgram widgets persistence", () => {
    productPage.getCombinationPolicyProgramTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate CommercialCrime widgets persistence", () => {
    productPage.getCommercialCrimeTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate CommercialInlandMarineFiled widgets persistence", () => {
    productPage.getCommercialInlandMarineFiledTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate CommercialLiabilityTraditional widgets persistence", () => {
    productPage.getCommercialLiabilityTraditionalTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate CommercialLiabilityCLT widgets persistence", () => {
    productPage.getCommercialLiabilityCLTTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate CommercialOutputProgram widgets persistence", () => {
    productPage.getCommercialOutputProgramTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate CommercialProperties widgets persistence", () => {
    productPage.getCommercialPropertiesTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate CommercialUmbrella widgets persistence", () => {
    productPage.getCommercialUmbrellaTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate Glass widgets persistence", () => {
    productPage.getGlassTab().click({ force: true });
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