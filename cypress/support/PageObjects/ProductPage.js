class ProductPage {

  getProductsTab() {
    return cy.contains("Products");
  }

  getProductAuto() {
    return cy.get("#menuItem-auto");
  }

  getProductCommercial() {
    return cy.get("#menuItem-commercial");
  }

  getProductFarm() {
    return cy.get("#menuItem-farmag");
  }

  getProductInlandMarine() {
    return cy.get("#menuItem-inlandmarine");
  }

  getProductPersonal() {
    return cy.get("#menuItem-personal");
  }

  getLandingPageBar() {
    return cy.get("#landing-page-bar-undefined");
  }

  getCommercialAutoTab() {
    // return cy.get("#product-button-Commerical\ Auto")
    return cy.contains("Commerical Auto");
  }

  getPersonalAutoTab() {
    // return cy.get("#product-button-Personal\ Auto");
    return cy.contains("Personal Auto");
  }

  getPersonalAutoNonStandardTab() {
    // return cy.get("#product-button-Personal\ Auto\ Non-Standard");
    return cy.contains("Personal Auto Non-Standard");
  }

  getCardOverview() {
    return cy.get("#card-grid-Overview");
  }

  getCardAvailability() {
    return cy.get("#card-grid-Availability");
  }

  getCardMaterialAvailable() {
    return cy.get("#card-grid-Material_Available");
  }

  getCardAnnouncements() {
    return cy.get("#card-grid-Announcements");
  }

  getCardBulletins() {
    return cy.get("#card-grid-Bulletins");
  }

  getCardRecentlyPublished() {
    return cy.get("#card-grid-Recently_Published");
  }

  getCardManualMaterials() {
    return cy.get("#card-grid-Manual_Materials");
  }

  getCardForms() {
    return cy.get("#card-grid-Forms");
  }

  getCardAdditionalMaterials() {
    return cy.get("#card-grid-Additional_Materials");
  }

  getListOfCards() {
    return [this.getCardOverview(), this.getCardAvailability(), this.getCardMaterialAvailable(),
      this.getCardAnnouncements(), this.getCardBulletins(), this.getCardRecentlyPublished(),
      this.getCardManualMaterials(), this.getCardForms(), this.getCardAdditionalMaterials()];
  }

  getArtisansTab() {
    return cy.get("#product-button-Artisans");
  }

  getBusinessownersTab() {
    return cy.get("#product-button-Businessowners");
  }

  getCannabisBusinessownersTab() {
    return cy.get("[name=\"product-button-Cannabis Businessowners\"]");
  }

  getCombinationPolicyProgramTab() {
    return cy.get("[name=\"product-button-Combination Policy Program\"]");
  }

  getCommercialCrimeTab() {
    return cy.get("[name=\"product-button-Commercial Crime\"]");
  }

  getCommercialInlandMarineFiledTab() {
    return cy.get("[name=\"product-button-Commercial Inland Marine (Filed)\"]");
  }

  getCommercialLiabilityTraditionalTab() {
    return cy.get("[name=\"product-button-Commercial Liability (Traditional)\"]");
  }

  getCommercialLiabilityCLTTab() {
    return cy.get("[name=\"product-button-Commercial Liability (w/ CLT)\"]");
  }

  getCommercialOutputProgramTab() {
    return cy.get("[name=\"product-button-Commercial Output Program\"]");
  }

  getCommercialPropertiesTab() {
    return cy.get("[name=\"product-button-Commercial Properties\"]");
  }

  getCommercialUmbrellaTab() {
    return cy.get("[name=\"product-button-Commercial Umbrella\"]");
  }

  getGlassTab() {
    return cy.get("#product-button-Glass");
  }


  getListOfProducts() {
    return cy.xpath("//div[@id=\"product-grid-undefined\"]//button");
  }

  getListOfMenuProductsCategory() {
    return cy.xpath("//ul[@id=\"menuItemsList-productsUL\"]//a");
  }


}

export default ProductPage;