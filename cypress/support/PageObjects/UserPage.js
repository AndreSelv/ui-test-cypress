class UserPage {

  getUserSearchBar() {
    return cy.get("[placeholder=\"Search\"]");
  }

  getListOfUsers() {
    return cy.get(`tr[class="MuiTableRow-root MuiTableRow-hover"]`);

  }

  getUserCountLabel() {
    return cy.get(`[data-test="usersCountLabel"]`);
  }

  countLabelValidation() {
    cy.wait(1000);
    this.getUserCountLabel().then($value => this.getListOfUsers().its("length")
      .should("equal", parseInt($value.text().match(/\(([^)]+)\)/)[1])));
  }

  getTitleBar() {
    return cy.get("[data-test=titlebar]");
  }

  getFirstNameField() {
    return cy.get("[data-test=firstName]");
  }

  getLastNameField() {
    return cy.get("[data-test=lastName]");
  }

  getUpdateButton() {
    return cy.get(".MuiGrid-justify-content-xs-flex-end > :nth-child(2) > .MuiButtonBase-root");
  }

  getUserFullName(){
    return cy.xpath(`(//*[@data-test="list-item-text"])[7]/span`)
  }

  getPhoneField(){
    return cy.get("[data-test=Phone]")
  }

  getExtensionField(){
    return cy.get("[data-test=Extension]")
  }

  getSnackBar(){
    return cy.get("[data-test=snackbar]")
  }

}

export default UserPage;