const BrowsePage = require("../../support/PageObjects/BrowsePage");
const ProductPage = require("../../support/PageObjects/ProductPage");
const browsePage = new BrowsePage();
const productPage = new ProductPage();

describe("Validate Product Dropdown menu", () => {

  beforeEach(() => {
    cy.initAmplify();
    cy.login();
    cy.visit("#/");
    productPage.getProductsTab().trigger("mouseover", { force: true });
  });

  it.skip("Validate ALL Product Category", () => {
    productPage.getListOfMenuProductsCategory().then((e) => {
      cy.wait(1000);
      Array.from(e).slice(1).forEach((element, index) => {
        cy.wrap(element).click({ force: true });
        cy.wrap(element).invoke("text").then(text => {
          productPage.getLandingPageBar().contains(text);
        });
      });
    });
  });


  it("Validate Auto tab", () => {
    productPage.getProductAuto().click({ force: true });
    productPage.getLandingPageBar().contains("Auto");
  });

  it("Validate Commercial tab", () => {
    productPage.getProductCommercial().click({ force: true });
    productPage.getLandingPageBar().contains("Commercial");
  });

  it("Validate Farm tab", () => {
    productPage.getProductFarm().click({ force: true });
    productPage.getLandingPageBar().contains("Farm & Ag");
  });

  it("Validate Inland Marine tab", () => {
    productPage.getProductInlandMarine().click({ force: true });
    productPage.getLandingPageBar().contains("Inland Marine");
  });

  it("Validate Personal tab", () => {
    productPage.getProductPersonal().click({ force: true });
    productPage.getLandingPageBar().contains("Personal");
  });
});