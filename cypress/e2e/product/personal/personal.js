const BrowsePage = require("../../../support/PageObjects/BrowsePage");
const ProductPage = require("../../../support/PageObjects/ProductPage");
const browsePage = new BrowsePage();
const productPage = new ProductPage();

describe("Validate Product page (Personal) functionalities (Landing page)", () => {

  beforeEach(() => {
    cy.initAmplify();
    cy.login();
    cy.visit("#/product?q=personal");
  });


  it("Validate Boatowners widgets persistence", () => {
    productPage.getBoatownersTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate DwellingProperties widgets persistence", () => {
    productPage.getDwellingPropertiesTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate Homeowners widgets persistence", () => {
    productPage.getHomeownersTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate MobileHomeowners widgets persistence", () => {
    productPage.getMobileHomeownersTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate Personal Premises and Liability widgets persistence", () => {
    productPage.getPersonalPremisesLiabilityTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate Personal Inland Marine widgets persistence", () => {
    productPage.getPersonalInlandMarineTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate Personal Umbrella widgets persistence", () => {
    productPage.getPersonalUmbrellaTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });
  it("Validate Yacht widgets persistence", () => {
    productPage.getYachtTab().click({ force: true });
    productPage.getListOfCards().forEach((el) => el.should("be.visible"));
  });


  it("Validate List of the Personal products", () => {
    productPage.getListOfProducts().each(($elm) => {
      cy.wait(1500);
      cy.get($elm).click({ force: true });
      productPage.getListOfCards().forEach((el) => el.should("be.visible"));
    });
  });
});