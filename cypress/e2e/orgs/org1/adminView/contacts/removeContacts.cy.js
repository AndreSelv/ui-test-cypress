const OrganizationPage = require("../../../../../support/PageObjects/OrganizationPage");
const organizationPage = new OrganizationPage();
describe("Remove User Contacts of A Position", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.bootStrapOrg1();
          cy.viewport(size, orientation);
        });

        it
        ("Remove User2 of Meeting Notice and Proxy Contact", () => {
          cy.visit("#/orgs/org1");
          cy.intercept("DELETE", `/orgs/org1/contacts/meetingNoticeAndProxy`);
          cy.fixture("/orgs/org1/org1.json").then((org1) => {
            org1.contacts.meetingNoticeAndProxy.splice(0, 1);
            cy.intercept("GET", `/orgs/org1`, org1).as("getEmail");
          });
          organizationPage.removeUserFromContacts("User2", "Lastname2").click({ multiple: true });
          cy.contains(
            "User2 Lastname2 removed as a Meeting Notice and Proxy Contact",
          );
          organizationPage.getMeetingNoticeAndProxyContactSection().should(
            "not.contain",
            "User2 Lastname2",
          );
        });

        it("Remove All Users of Invoice Contact", () => {
          cy.visit("#/orgs/org1");

          // Remove User 5 Lastname5
          cy.intercept("DELETE", `/orgs/org1/contacts/assessmentInvoice`);
          cy.fixture("/orgs/org1/org1.json").then((org1) => {
            org1.contacts.assessmentInvoice.splice(0, 1);
            cy.intercept("GET", `/orgs/org1`, org1).as("getEmail");
          });
          organizationPage.removeUserFromContacts("User5", "Lastname5").click();
          cy.contains("User5 Lastname5 removed as a Invoice Contact contact");
          organizationPage.getInvoiceContactSection()
            .should("not.contain", "User5 Lastname5")
            .and("be.visible");


          // Remove User8 Lastname8
          cy.fixture("/orgs/org1/org1.json").then((org1) => {
            org1.contacts.assessmentInvoice.splice(0, 2);
            cy.intercept("GET", `/orgs/org1`, org1).as("getEmail");
          });
          organizationPage.removeUserFromContacts("User8", "Lastname8").click();
          cy.contains("User8 Lastname8 removed as a Invoice Contact contact");
          organizationPage.getInvoiceContactSection()
            .should("not.contain", "User8 Lastname8")
            .and("not.be.visible");
        });
      });
    });
  });
});
