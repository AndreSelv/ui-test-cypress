class OrganizationPage {
  getCreateOrgButton() {
    return cy.get(".MuiButton-label").contains("Create Org");
  }

  getCompanyNumberField() {
    return cy.get("#companyNumber");
  }

  getCompanyNameField() {
    return cy.get("#name");
  }

  getCreateButton() {
    return cy.get(".MuiButton-contained").contains("Create");
  }

  getUsersButton() {
    return cy.get(":nth-child(2) > .MuiTab-wrapper");
  }

  getAddressesButton() {
    return cy.get(":nth-child(3) > .MuiTab-wrapper");
  }

  getHistoryButton() {
    return cy.get(":nth-child(4) > .MuiTab-wrapper");
  }

  getBillingAddressSection() {
    return cy.get("[data-test=\"Billing Address\"]");
  }

  getAddButton() {
    return cy.get(`[data-test=Add]`);
  }

  getAddUserButton() {
    return cy.get("[data-test=\"addUserButton\"]");
  }

  getAddButtonLocator() {
    return `[data-test=Add]`;
  }

  getAddressInputField() {
    return cy.get(".geosuggest__input");
  }

  getPickUserDropdown() {
    return cy.get("[data-test=pickUser]");
  }

  selectUserFromDropdown(user) {
    this.getPickUserDropdown().click().type(user);
  }

  getSelectUserButton() {
    return cy.contains("Select user");
  }

  getAddMeetingNoticeAndProxyContact() {
    return cy.get("[data-test=\"Add-Meeting Notice and Proxy Contact\"]");
  }

  getMeetingNoticeAndProxyContactSection() {
    return cy.get("[data-test=\"Meeting Notice and Proxy Contact\"]");
  }

  getAddInvoiceContact() {
    return cy.get("[data-test=\"Add-Invoice Contact\"]");
  }

  getInvoiceContactSection() {
    return cy.get("[data-test=\"Invoice Contact\"]");
  }

  getEmailInputField() {
    return cy.get("[data-test=email-input]");
  }

  typeUserEmailIntoField(email) {
    this.getEmailInputField().type(email);
  }

  getSubmitAddingUserButton() {
    return cy.get(".MuiDialogActions-root > .MuiButton-contained");
  }

  typeAddressIntoAddressField(address) {
    this.getAddressInputField().click().type(address);
  }

  removeUserFromContacts(firstName, lastName) {
    return cy.get(`[data-test="Action-${firstName} ${lastName}"] > :nth-child(2)`);
  }

  removeUserFromOrganization(email) {
    cy.get(`[data-test="rowDisplay-${email}"] > :nth-child(4) > [data-test="roleDelete"]`).click();
  }

  getOrganizationSearchBar() {
    return cy.get(".MuiInputBase-input");
  }

  getListOfOrganizations() {
    return cy.get(`tr[class="MuiTableRow-root MuiTableRow-hover"]`);
  }
}

export default OrganizationPage;