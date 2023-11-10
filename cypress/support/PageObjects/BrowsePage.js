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

  getPlans() {
    return cy.get("#plans-select");
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
    return cy.xpath("//*[text()='Search']/..//input");
  }

  getCalendarPicker() {
    return cy.get(".MuiCalendarPicker-root");
  }

  getFromDateField() {
    return cy.xpath("//*[text()='From']/..//input");
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

  getDownloadButton() {
    return cy.get(`[data-test=browseScreen-item-download-button]`);
  }

  getDownloadAlertMessage() {
    return "IF YOU ARE USING AAIS ADVISORY PRODUCTS OR SERVICES AAIS IS REQUIRED TO REPORT TO STATE" +
      " REGULATORS ANY USE OF ADVISORY CONTENT AND USE OF THESE MATERIALS MAY REQUIRE A GRANT OF FILING AUTHORIZATION. " +
      "PRIOR TO USING THIS CONTENT, PLEASE CONTACT AN AAIS ENGAGEMENT MANAGER AT MEMBERSHIP@AAISONLINE.COM TO DISCUSS " +
      "YOUR USE OF ANY AAIS PRODUCTS AND SERVICES.";
  }

  getNoAvailablePreviewFiles() {
    return "No file is available for preview. Please download the publication to view other available file types, such as a Word document.";
  }

  getAlertIAgreeButton() {
    return cy.contains("I Agree");
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

  getRadioGroupSection() {
    return cy.get("[role=\"radiogroup\"]");
  }

  getDialogWindows() {
    return cy.get("[role=\"dialog\"]");
  }

  selectDocsByRadioButton(number) {
    return cy.get("[type=\"radio\"]").eq(number - 1);
  }

  getRowDisplay(line, state) {
    return cy.get(`[data-test="rowDisplay-${line}${state}"]`);
  }

  getExcludeFileContentCheckBox() {
    return cy.get("input[type=\"checkbox\"]");
  }


  selectProduct(...products) {
    for (const product of products) {
      this.getProduct().type(`${product} - {downArrow}{enter}{esc}`);
      this.getProductSection().should("contain.text", product);
      // cy.wait(500)
    }
  }

  selectPublicationByNumber(number) {
    this.getListOfPublicationsCards().eq(number - 1).click();
  }

  selectMaterialType(...types) {
    this.getMaterial().click();
    cy.get('#packageType-select-listbox').scrollTo("top");
    this.getAllCheckBox()
      .as("checkboxes").check([...types], { force: true });
    this.getMaterial().click();
  }

  unSelectMaterialType(type) {
    this.getMaterial().click();
    cy.get('#packageType-select-listbox').scrollTo("top");
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

  selectState(...states) {
    for (const state of states) {
      this.getStates().click({ force: true });
      cy.get(`[data-test=select${state}]`).click({ force: true });
      cy.contains("Filter").click({ force: true });
      // .type("{esc}");
      cy.wait(300);
    }

  }

  selectPlans(...plans) {
    for (const plan of plans) {
      this.getPlans().type(`${plan}{downArrow}{enter}{esc}`);
      cy.wait(300);
    }
  }

  selectAllStates() {
    this.getStates().click();
    cy.get("[data-test=selectALLSTATES]").click();
    this.getStates().click();
  }

  typeSearch(text) {
    cy.wait(500);
    this.getSearchField().type(`${text}{enter}{enter}`, { force: true });
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

  setFromDateField(date) {
    this.getFromDateField().type(date, { force: true })
      .invoke("attr", "value", date)
      .should("have.attr", "value", date);
  }

  setToDateField(date) {
    this.getToDateField().type(date, { force: true })
      .invoke("attr", "value", date)
      .should("have.attr", "value", date);
  }

  getRandomState(STATES) {
    return STATES[Object.keys(STATES)[Math.floor(Math.random() * Object.keys(STATES).length)]].key;
  }

}

export default BrowsePage;