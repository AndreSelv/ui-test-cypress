class BrowsePage {

  getProduct() {
    return cy.get("#product-select");
  }

  getCloseProductsButton() {
    return cy.xpath(`(//*[@data-testid="CloseIcon"])[1]`);
  }

  getProductSection() {
    return cy.get(`div[data-test="browseProduct"]`);
  }

  getBrowseCountResultField() {
    return cy.xpath("//h6/../p");
  }

  getMaterial() {
    return cy.get("#packageType-select");
  }

  getStates() {
    return cy.get("[data-test=addState]");
  }

  getSearchField() {
    return cy.get("[data-test=browseScreenSearch]");
  }

  getCalendarPicker() {
    return cy.get(".MuiCalendarPicker-root");
  }

  getEffectiveDateField() {
    return cy.contains("Effective Date");
  }

  getOldestDateField() {
    return cy.contains("Oldest Date");
  }

  getListOfPublications() {
    return cy.get(`span:contains("more")`);
  }

  getListOfPublicationsCards() {
    return cy.xpath(`//div[contains(@class, "infinite-scroll-component ")]//p`);
  }

  selectProduct(product) {
    return this.getProduct().type(`${product} - {downArrow}{enter}{esc}`);
  }

  getBrowseResultLineBadge(number = 0) {
    return cy.get(`[data-test=browseResults-item-${number}-line-badge]`);
  }

  getBrowseResultLineIcon(number = 0) {
    return cy.get(`[data-test=browseResults-item-${number}-line-icon]`);
  }

  getBrowseResultLineTooltip(number = 0) {
    return cy.get(`[data-test=browseResults-item-${number}-line-tooltip]`);
  }


  getBrowseResultStateBadge(number = 0) {
    return cy.get(`[data-test=browseResults-item-${number}-state-badge]`);
  }

  getBrowseResultStateIcon(number = 0) {
    return cy.get(`[data-test=browseResults-item-${number}-state-icon]`);
  }

  getBrowseResultStateTooltip(number = 0) {
    return cy.get(`[data-test=browseResults-item-${number}-state-tooltip]`);
  }


  selectMaterialType(type) {
    this.getMaterial().click();
    cy.get(`input[type="checkbox"]`)
      .as("checkboxes").check(type, { force: true });
    this.getMaterial().click();
  }

  selectState(state) {
    this.getStates().click();
    cy.get(`[data-test=select${state}]`).click().type("{esc}");
  }

  selectAllStates() {
    this.getStates().click();
    cy.get("[data-test=selectALLSTATES]").click();
  }

  typeSearch(text) {
    this.getSearchField().type(`${text}{enter}`);
  }

  publicationsShouldBeGreaterThen(value = 20) {
    this.getListOfPublications().its("length").should("be.gte", value);
  }

  circleShouldBeVisible() {
    cy.xpath(`//div[@class="MuiCircularProgress-root MuiCircularProgress-colorPrimary MuiCircularProgress-indeterminate"]`)
      .find(`circle[class="MuiCircularProgress-circle MuiCircularProgress-circleIndeterminate"]`)
      .should("be.visible");
  }

}

export default BrowsePage;