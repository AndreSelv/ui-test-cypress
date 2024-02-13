class BrowsePage {

  getProduct() {
    return cy.get("#product-select");
  }

  getCloseProductsButton() {
    return cy.xpath(`(//*[@data-testid="CloseIcon"])[1]`);
  }

  getClearFilter() {
    return cy.get(`[aria-label="clear"]`);
  }

  getProductSection() {
    return cy.get(`[data-test="browseProduct"]`);
  }

  getPlans() {
    return cy.get("#plans-select");
  }

  getMaterialTypeSection() {
    return cy.get("[data-test=\"packageTypeCategory\"]");
  }

   getMaterialTypeSubSection() {
    return cy.get("[data-test=\"packageType\"]");
  }

  getBrowseCountResultField() {
    return cy.xpath("//h6/../p");
  }

  getClasses() {
    return cy.get("#classes-select");
  }

  getMaterial() {
    return cy.get('#packageTypeCategory-select')
  }

  getSubMaterial(){
    return cy.get('#packageType-select')
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

  getRecentDownloadsButton(){
    return cy.contains('Recent Downloads')
  }

  getRecentDownloadsSection(){
    return cy.get(':nth-child(4) > .MuiCard-root > .MuiCardContent-root')
  }

  getListOfPublicationsCards() {
    // return cy.xpath(`//div[contains(@class, "infinite-scroll-component ")]//p`);
    return cy.get(`[data-product="product"]`);
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
    return cy.get(".MuiGrid-grid-xs-5");
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

  getExpandedSection() {
    return cy.get(".MuiCollapse-wrapperInner >");
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

  getGoToDownloadPageMessage() {
    return "Your content is being downloaded. If the download exceeds 30 seconds, the zip file will be available in the Recent Downloads section.";
  }

  getNoAvailablePreviewFiles() {
    return "No file is available for preview. Please download the publication to view other available file types, such as a Word document.";
  }

  getGoToSeDownloadSectionOnTheLeftButton() {
    return cy.get(".MuiDialogActions-root > :nth-child(2)");
  }

  getAlertIAgreeButton() {
    return cy.contains("I Agree");
  }

  getFilesRadioButtonSection() {
    return cy.xpath("//label[@id=\"files-radio-buttons-group-label\"]/..");
  }

  getInfoIcon(number = 0) {
    return cy.get(`[data-test="browseResults-item-${number}-more-info-icon"]`);
  }

  getDownloadIcon(number = 0) {
    return cy.get(`[data-test="browseResults-item-${number}-download-badge"]`);
  }


  getListOfProductLinesInCard() {
    return cy.xpath("//h6[text()= 'Product']/../div[1]//span[@class='MuiChip-label MuiChip-labelSmall']");
  }

  getListOfStatesInCard() {
    return cy.xpath("//h6[text()= 'Product']/../div[2]//span[@class='MuiChip-label MuiChip-labelSmall']");
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
    // for (const product of products) {
    //   this.getProduct().type(`${product} - {downArrow}{enter}{esc}`);
    //   cy.wait(300)
    //   this.getProductSection().should("contain.text", product);
    // }
    this.getProduct().click();
    cy.wait(300);
    // cy.get("#packageType-select-listbox").scrollTo("top");
    this.getAllCheckBox()
      .as("checkboxes").check([...products], { force: true });
    this.getProduct().click();
  }

  selectPublicationByNumber(number) {
    this.getListOfPublicationsCards().eq(number - 1).click(30, 25);
    // cy.get(':nth-child(1) > .MuiListItem-root > .jss257 > .jss223').click()
  }

  selectMaterialType(...types) {
    this.getMaterial().click();
    cy.wait(300);
    // cy.get("#packageType-select-listbox").scrollTo("top");
    this.getAllCheckBox()
      .as("checkboxes").check([...types], { force: true });
    this.getMaterial().click();
  }

  selectMaterialSubType(...types) {
    this.getSubMaterial().click();
    cy.wait(300);
    // cy.get("#packageType-select-listbox").scrollTo("top");
    this.getAllCheckBox()
      .as("checkboxes").check([...types], { force: true });
    this.getSubMaterial().click();
  }

  unSelectMaterialType(type) {
    this.getMaterial().click();
    // cy.get("#packageType-select-listbox").scrollTo("top");
    this.getAllCheckBox()
      .as("checkboxes").uncheck(type, { force: true });
    this.getMaterial().click();
  }

   unSelectMaterialSubType(type) {
    this.getSubMaterial().click();
    // cy.get("#packageType-select-listbox").scrollTo("top");
    this.getAllCheckBox()
      .as("checkboxes").uncheck(type, { force: true });
    this.getSubMaterial().click();
  }

  selectClass(value) {
    this.getClasses().should("be.visible");
    this.getClasses().click();
    cy.contains(value).click();
    this.getClasses().click();
  }

  selectState(...states) {
    // for (const state of states) {
    //   this.getStates().click({ force: true });
    //   cy.get(`[data-test=select${state}]`).click({ force: true });
    //   cy.contains("Filter").click({ force: true });
    //   cy.wait(300);
    // }

    this.getStates().click();
    cy.wait(300);
    this.getAllCheckBox()
      .as("checkboxes").check([...states], { force: true });
    this.getStates().click();
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
    cy.wait(300);
    // this.getSearchField().type(`${text}`, { force: true });
    this.getSearchField().type(`${text}`, { delay: 200 });
  }

  publicationsShouldBeGreaterThen(value = 20) {
    this.getListOfPublicationsCards().its("length").should("be.gte", value);
  }

  publicationsShouldBeEqual(value = 0) {
    this.getListOfPublicationsCards().its("length").should("equal", value);
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

  getRequestHelpButton() {
    return cy.get("[data-test=\"browseScreen-item-product-request-button\"]");
  }


  testToolTip(element, toolTip) {
    element.trigger("mouseover", {force: true});
    cy.contains(toolTip);
    element.trigger("mouseout", {force: true});
    // cy.contains(toolTip).should('not.exist')
  }

}

export default BrowsePage;