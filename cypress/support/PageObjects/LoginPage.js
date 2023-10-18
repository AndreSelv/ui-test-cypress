class LoginPage {

  getUsernameField() {
    return cy.get("[name=\"username\"]");
  }

  getPasswordField() {
    return cy.get("[name=\"password\"]");
  }

  getSignInButton() {
    return cy.get("[type=\"submit\"]");

  }

  typeIn(field, value) {
    field.type(value);
  }

}

export default LoginPage;