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

  getMaterialTypeSection() {
    return cy.get("[data-test=\"packageType\"]");
  }

  getBrowseCountResultField() {
    return cy.xpath("//h6/../p");
  }

  getClasses() {
    return cy.get("#classes-select");
  }

  getMaterial() {
    return cy.get("#packageType-select");
  }

  getStates() {
    return cy.get("#state-select");
  }

  getSearchField() {
    return cy.get("[data-test=browseScreenSearch]");
  }

  getCalendarPicker() {
    return cy.get(".MuiCalendarPicker-root");
  }

  getFromDateField() {
    return cy.xpath("//*[text()='From']/..//input")
  }

  getToDateField() {
    return cy.xpath("//*[text()='To']/..//input");
  }

  getListOfPublications() {
    return cy.get(`span:contains("more")`);
  }

  getListOfPublicationsCards() {
    return cy.xpath(`//div[contains(@class, "infinite-scroll-component ")]//p`);
  }

  getProductRequestButton() {
    return cy.get(`[data-test="browseScreen-item-product-request-button"]`);
  }

  getAdditionalInfoButton() {
    return cy.get(`textarea[placeholder="What can we do for you?"]`);
  }

  getSubmitModalRequestButton() {
    return cy.get(`[data-test="submit-modal-request"]`);
  }

  getAlertDialogDescription() {
    return cy.get("#alert-dialog-description");
  }

  getKeepBrowsingProductButton() {
    return cy.get("[data-test=\"keep-browsing-products\"]");
  }

  getBrowseSearchResultSection() {
    return cy.get(".MuiGrid-grid-md-9");
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

  getAllCheckBox() {
    return cy.get(`input[type="checkbox"]`);
  }

  getFilesRadioButtonSection() {
    return cy.xpath("//label[@id=\"files-radio-buttons-group-label\"]/..");
  }

  getInfoIcon(number) {
    return cy.get(`[data-test="browseResults-item-${number}-more-info-icon"]`);
  }

  getMoreButton(number) {
    return cy.xpath(`(//span[text()='more'])[${number}]`);
  }

  getListOfProductLinesInCard() {
    return cy.xpath("//h6[text()= 'Product Lines']/../div[1]//span[@class='MuiChip-label MuiChip-labelSmall']");
  }

  getListOfStatesInCard() {
    return cy.xpath("//h6[text()= 'Product Lines']/../div[2]//span[@class='MuiChip-label MuiChip-labelSmall']");
  }

  selectMaterialType(type) {
    this.getMaterial().click();
    this.getAllCheckBox()
      .as("checkboxes").check(type, { force: true });
    this.getMaterial().click();
  }

  unSelectMaterialType(type) {
    this.getMaterial().click();
    this.getAllCheckBox()
      .as("checkboxes").uncheck(type, { force: true });
    this.getMaterial().click();
  }

  selectClass(value) {
    this.getClasses().should("be.visible");
    this.getClasses().click();
    cy.contains(value).click();
    this.getClasses().click();
  }

  selectState(state) {
    this.getStates().click();
    cy.get(`[data-test=select${state}]`).click();
    cy.contains("Filter").click();
    // .type("{esc}");
  }

  selectAllStates() {
    this.getStates().click();
    cy.get("[data-test=selectALLSTATES]").click();
  }

  typeSearch(text) {
    cy.wait(500);
    this.getSearchField().type(`${text}{enter}{enter}`);
  }

  publicationsShouldBeGreaterThen(value = 20) {
    this.getListOfPublications().its("length").should("be.gte", value);
  }

  publicationsShouldBeEqual(value = 0) {
    this.getListOfPublications().its("length").should("equal", value);
  }

  circleShouldBeVisible() {
    cy.xpath(`//div[@class="MuiCircularProgress-root MuiCircularProgress-colorPrimary MuiCircularProgress-indeterminate"]`)
      .find(`circle[class="MuiCircularProgress-circle MuiCircularProgress-circleIndeterminate"]`)
      .should("be.visible");
  }

  deleteStateFromFilter(state) {
    return cy.get(`[data-test=chip${state}] > .MuiChip-deleteIcon`);
  }

  setFromDateField(date){
    this.getFromDateField().click({force:true}).type(date,{force:true})
      .should('have.attr', 'value', date)
  }

   setToDateField(date){
    this.getToDateField().click({force:true}).type(date, {force:true})
      .should('have.attr', 'value', date)
  }

  getRandomState(STATES){
    return STATES[Object.keys(STATES)[Math.floor(Math.random()*Object.keys(STATES).length)]].key;
  }

}

export default BrowsePage;