class LinesPage {

  getAlertDialogDescriptionsMessage(){
    return cy.get(`#alert-dialog-description`)
  }

  getStatus(){
    return cy.get(`[data-test=status]`)
  }

  getDownloadButton(){
    return cy.get(`[data-test=downloadLatest]`)
  }

  getStates() {
    return cy.get("[data-test=addState]");
  }

  getExpendMoreButton(){
    return cy.get(`[data-test=expandMore]`)
  }

  getLineDescription(){
    return cy.get(`[data-test=lineDescription]`)
  }

  getTitleBar(){
    return cy.get(`[data-test=titlebar]`)
  }

  validateThatStateSelected(state) {
    cy.get(`div[data-test="chip${state}"]`).should("be.visible");
  }

   selectState(state) {
    this.getStates().click();
    cy.get(`[data-test=select${state}]`).click();
  }

  deleteState(state) {
    this.validateThatStateSelected(state)
    cy.get(`[data-test=chip${state}] > .MuiChip-deleteIcon`).click();
  }

  successDownloadMessage(){
    return "Your content is being downloaded. If the download exceeds 30 seconds, " +
      "the zip file will be available on the download page in no more than 15 minutes. Thank you."
  }


}

export default LinesPage;