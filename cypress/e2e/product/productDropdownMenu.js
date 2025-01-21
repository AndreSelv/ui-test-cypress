const BrowsePage = require("../../support/PageObjects/BrowsePage");
const ProductPage = require("../../support/PageObjects/ProductPage");
const browsePage = new BrowsePage();
const productPage = new ProductPage();

describe("Validate Product Dropdown menu", () => {

  beforeEach(() => {
    cy.initAmplify();
    cy.login();
    cy.visit("#/");
    productPage.getProductsTab().trigger("mouseover");
    cy.wait(3000)
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
    productPage.getLandingPageBar("Auto").contains("Auto");
  });

  it("Validate Commercial tab", () => {
    productPage.getProductCommercial().click({ force: true });
    productPage.getLandingPageBar("Commercial\\ Lines").contains("Commercial");
  });

  it("Validate Farm tab", () => {
    productPage.getProductFarm().click({ force: true });
    productPage.getLandingPageBar("Farm\\ \\&\\ Ag").contains("Farm & Ag");
  });

  it("Validate Inland Marine tab", () => {
    productPage.getProductInlandMarine().click({ force: true });
    productPage.getLandingPageBar("Inland\\ Marine").contains("Inland Marine");
  });

  it("Validate Personal tab", () => {
    productPage.getProductPersonal().click({ force: true });
    productPage.getLandingPageBar("Personal\\ Lines").contains("Personal");
  });
});