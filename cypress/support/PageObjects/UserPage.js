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

}

export default UserPage;