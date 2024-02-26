const UserPage = require("../../support/PageObjects/UserPage");
const userPage = new UserPage();
describe("Access My Profile - Update Info", () => {

  beforeEach(() => {
    cy.initAmplify();
    cy.login();
    cy.visit("#/");
    cy.contains("TU").click();
    cy.contains("My Profile").click();
  });

  it("Update First Name", () => {
    userPage.getUserFullName().then(($fn) => {
      let testName = "Teey";
      let initName = $fn.text().substring(0, $fn.text().indexOf(" "));
      userPage.getTitleBar().should("contain", initName);
      // Delete "hn" from "John" and adding "ey"
      userPage.getFirstNameField().clear().type(testName);
      userPage.getUpdateButton().click();
      userPage.getTitleBar().should("contain", testName);
      userPage.getFirstNameField().clear().type(initName);
      userPage.getUpdateButton().click();
      userPage.getTitleBar().should("contain", initName);
    });
  });

  it("Update Last Name", () => {
    userPage.getUserFullName().then(($ln) => {
      let testName = "Selvan";
      let initName = $ln.text().substring($ln.text().indexOf(" ") + 1);
      userPage.getTitleBar().should("contain", initName);
      userPage.getLastNameField().clear().type(testName);
      userPage.getUpdateButton().click();
      userPage.getTitleBar().should("contain", testName);
      userPage.getLastNameField().clear().type(initName);
      userPage.getUpdateButton().click();
      userPage.getTitleBar().should("contain", initName);
    });
  });

  it("Update Phone", () => {
    // cy.fixture("orgs/org1/myUser").then((user) => {
    //   user.phoneNumbers = {
    //     office: [
    //       {
    //         phoneNumber: "2171234567",
    //         phoneNumberId: "phone1",
    //         countryCode: "+1",
    //         created: "2020-07-13T20:29:03.334Z",
    //       },
    //     ],
    //   };
    //   cy.route(
    //     "GET",
    //     "/users/659a5e72-01c2-41dc-b962-e797b25d1636",
    //     user
    //   );
    // });
    let testPhone = `2171234567`;
    let initPhone = `2323232323`;
    userPage.getPhoneField().clear().type(testPhone);
    userPage.getUpdateButton().click();
    userPage.getPhoneField().should("have.value", testPhone);
    userPage.getPhoneField().clear().type(initPhone);
    userPage.getUpdateButton().click();
    userPage.getPhoneField().should("have.value", initPhone);
  });

  it("Update Phone and Extension", () => {
    userPage.getPhoneField().clear().type("2171234567");
    userPage.getExtensionField().clear().type("1234");
    userPage.getUpdateButton().click();
    userPage.getPhoneField().should("have.value", "2171234567");
    userPage.getPhoneField().clear().type("123456789");
    userPage.getUpdateButton().click();
    userPage.getPhoneField().should("have.value", "123456789");
  });

  it("First name Is Empty", () => {
    userPage.getSnackBar().should("not.exist");
    userPage.getFirstNameField().type("{selectall}{backspace}");
    userPage.getUpdateButton().click();
    userPage.getSnackBar()
      .should("be.visible")
      .and("contain", "Firstname cannot be empty");
  });

  it("Last name Is Empty", () => {
    userPage.getSnackBar().should("not.exist");
    userPage.getLastNameField().type("{selectall}{backspace}");
    userPage.getUpdateButton().click();
    userPage.getSnackBar()
      .should("be.visible")
      .and("contain", "Lastname cannot be empty");
  });

  it("Phone is Empty", () => {
    userPage.getSnackBar().should("not.exist");
    userPage.getPhoneField().type("{selectall}{backspace}");
    userPage.getExtensionField().type("1234");
    userPage.getUpdateButton().click();
    userPage.getSnackBar()
      .should("be.visible")
      .and("contain", "Phone cannot be empty");
  });
});
