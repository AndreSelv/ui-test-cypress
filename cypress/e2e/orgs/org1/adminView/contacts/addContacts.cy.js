const OrganizationPage = require("../../../../../support/PageObjects/OrganizationPage");
const organizationPage = new OrganizationPage();
describe("Add User Contacts for Positions", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.bootStrapOrg1();

          cy.viewport(size, orientation);
        });

        it("Add User5 for Meeting Notice and Proxy Contact", () => {
          cy.visit("#/orgs/org1");
          cy.fixture("/orgs/org1/org1.json").then((org1) => {
            org1.contacts.meetingNoticeAndProxy.push({
              userId: "user5",
              created: "2020-06-20T16:14:21.207",
            });
            cy.intercept("GET", `/orgs/org1`, org1).as("getEmail");
          });

          organizationPage.getAddMeetingNoticeAndProxyContact()
            .find(organizationPage.getAddButtonLocator())
            .click();
          organizationPage.selectUserFromDropdown("user5@aaisdirect.com{downarrow}{enter}");
          organizationPage.getSelectUserButton().click();
          organizationPage.getMeetingNoticeAndProxyContactSection().should(
            "contain",
            "User5 Lastname5",
          );
        });

        it("Add User3 for Invoice Contact", () => {
          cy.visit("#/orgs/org1");
          cy.fixture("/orgs/org1/org1.json").then((org1) => {
            org1.contacts.assessmentInvoice.push({
              userId: "user3",
              created: "2019-06-15T14:19:20.207Z",
            });
            cy.intercept("GET", `/orgs/org1`, org1).as("getEmail");
          });

          organizationPage.getAddInvoiceContact()
            .find(organizationPage.getAddButtonLocator())
            .click();
          organizationPage.selectUserFromDropdown("user3@aaisdirect.com{downarrow}{enter}");
          organizationPage.getSelectUserButton().click();
          organizationPage.getInvoiceContactSection().should("contain", "User3");
        });

        it("Add User3 and User5 for Meeting Notice and Proxy Contact", () => {
          cy.visit("#/orgs/org1");

          cy.fixture("/orgs/org1/org1.json").then((org1) => {
            org1.contacts.meetingNoticeAndProxy.push({
              userId: "user5",
              created: "2020-06-20T16:14:21.207",
            });
            cy.intercept("GET", `/orgs/org1`, org1).as("getEmail");
          });

          organizationPage.getAddMeetingNoticeAndProxyContact()
            .find(organizationPage.getAddButtonLocator())
            .click();
          organizationPage.selectUserFromDropdown("user5@aaisdirect.com{downarrow}{enter}");
          organizationPage.getSelectUserButton().click();
          organizationPage.getMeetingNoticeAndProxyContactSection().should(
            "contain",
            "User5 Lastname5",
          );

          cy.fixture("/orgs/org1/org1.json").then((org1) => {
            org1.contacts.meetingNoticeAndProxy.push(
              {
                userId: "user5",
                created: "2020-06-20T16:14:21.207",
              },
              {
                userId: "user3",
                created: "2019-06-15T14:19:20.207Z",
              },
            );
            cy.intercept("GET", `/orgs/org1`, org1).as("getEmail");
          });

          organizationPage.getAddMeetingNoticeAndProxyContact()
            .find(organizationPage.getAddButtonLocator())
            .click();
          organizationPage.selectUserFromDropdown("user5@aaisdirect.com{downarrow}{enter}");
          organizationPage.getSelectUserButton().click();
          organizationPage.getMeetingNoticeAndProxyContactSection().should("contain", "User5 Lastname5")
            .and("contain", "User3 Lastname3");
        });
      });
    });
  });
});
