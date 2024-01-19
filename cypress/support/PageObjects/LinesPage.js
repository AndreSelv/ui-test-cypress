class LinesPage {

  getTitleBar() {
    return cy.get(`[data-test="titlebar"]`);
  }

  getTitleBarSection() {
    return cy.get(".MuiAccordionSummary-root");
  }

  getAlertDialogDescriptionsMessage() {
    return cy.get(`#alert-dialog-description`);
  }

  getStatus() {
    return cy.get(`[data-test=status]`);
  }

  getDownloadButton() {
    return cy.get(`[data-test=downloadLatest]`);
  }

  getStates() {
    return cy.get("[data-test=addState]");
  }

  getExpendMoreButton() {
    return cy.get(`[data-test=expandMore]`);
  }

  getLineDescription() {
    return cy.get(`[data-test=lineDescription]`);
  }


  validateThatStateSelected(state) {
    cy.get(`div[data-test="chip${state}"]`).should("be.visible");
  }

  selectState(state) {
    this.getStates().click();
    cy.get(`[data-test=select${state}]`).click();
  }

  deleteState(state) {
    this.validateThatStateSelected(state);
    cy.get(`[data-test=chip${state}] > .MuiChip-deleteIcon`).click();
  }

  successDownloadMessage() {
    return "Your content is being downloaded. If the download exceeds 30 seconds, " +
      "the zip file will be available on the download page in no more than 15 minutes. Thank you.";
  }

  getMoreButton(section = 1) {
    return cy.xpath(`(//span[contains(text(),"more")])[${section}]`);
  }

  getLessButton(section = 1) {
    return cy.xpath(`(//span[contains(text(),"less")])[${section}]`);
  }

  getExpandedSection() {
    return cy.get(`div[class="MuiCollapse-root MuiCollapse-entered"]`);
  }

}

export default LinesPage;