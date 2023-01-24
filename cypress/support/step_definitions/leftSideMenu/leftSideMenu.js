import { When, Then } from "cypress-cucumber-preprocessor/steps";
import { LeftSideMenuComponent } from "../../../pages/methods/LeftSideMenu.component";

const menu = new LeftSideMenuComponent();

When("The user is located in the homepage", () => {
  cy.location().should((loc) => {
    expect(loc.href.toString().endsWith("/#")).to.be.true;
  });
});

Then("The user is able to see the left side menu", () => {
  cy.get(menu.getLeftSideMenu()).should("be.visible");
});

Then("The user is able to see the aais logo", () => {
  cy.get(menu.getAaisLogo()).should("be.visible");
});

Then("The user is able to see the next options", (dataTable) => {
  var rows = dataTable.hashes();

  cy.get(menu.getHomeIcon()).scrollIntoView().should("be.visible");
  cy.get(menu.getHomeText()).contains(rows[0].options);
  cy.get(menu.getHomeLink()).invoke("attr", "href").should("eq", rows[0].href);
  cy.get(menu.getBrowseProductsIcon()).should("be.visible");
  cy.get(menu.getBrowseProductsText()).contains(rows[1].options);
  cy.get(menu.getBroweProductsLink())
    .invoke("attr", "href")
    .should("eq", rows[1].href);
  cy.get(menu.getStatisticalReportingIcon()).should("be.visible");
  cy.get(menu.getStatisticalReportingText()).contains(rows[2].options);
  cy.get(menu.getStatisticalReportingLink())
    .invoke("attr", "href")
    .should("eq", rows[2].href);
  cy.get(menu.getMyOrganizationIcon()).should("be.visible");
  cy.get(menu.getMyOrganizationText()).contains(rows[3].options);
  cy.get(menu.getMyOrganizationLink())
    .invoke("attr", "href")
    .should("eq", rows[3].href);
  cy.get(menu.getSettingsIcon()).should("be.visible");
  cy.get(menu.getSettingsText()).contains(rows[4].options);
  cy.get(menu.getSettingsLink())
    .invoke("attr", "href")
    .should("contains", rows[4].href);
  cy.get(menu.getLogoutIcon()).should("be.visible");
  cy.get(menu.getLogoutText()).contains(rows[5].options);
  cy.get(menu.getLogoutLink())
    .invoke("attr", "href")
    .should("eq", rows[5].href);
});

Then(
  "The user is able to see the left side menu displays icons and texts",
  () => {
    cy.get(menu.getHomeIcon()).scrollIntoView().should("be.visible");
    cy.get(menu.getHomeText()).should("be.visible");
    cy.get(menu.getBrowseProductsIcon()).should("be.visible");
    cy.get(menu.getBrowseProductsText()).should("be.visible");
    cy.get(menu.getStatisticalReportingIcon()).should("be.visible");
    cy.get(menu.getStatisticalReportingText()).should("be.visible");
    cy.get(menu.getMyOrganizationIcon()).should("be.visible");
    cy.get(menu.getMyOrganizationText()).should("be.visible");
    cy.get(menu.getSettingsIcon()).should("be.visible");
    cy.get(menu.getSettingsText()).should("be.visible");
    cy.get(menu.getLogoutIcon()).should("be.visible");
    cy.get(menu.getLogoutText()).should("be.visible");
  }
);

When("The user click in collapse the left side menu", () => {
  cy.get(menu.getLeftSideMenuCollapseButton()).click();
});

Then(
  "The user sees the left side menu collapsed and only displays icons",
  () => {
    cy.get(menu.getHomeIcon()).scrollIntoView().should("be.visible");
    cy.get(menu.getHomeText()).should("not.be.visible");
    cy.get(menu.getBrowseProductsIcon()).should("be.visible");
    cy.get(menu.getBrowseProductsText()).should("not.be.visible");
    cy.get(menu.getStatisticalReportingIcon()).should("be.visible");
    cy.get(menu.getStatisticalReportingText()).should("not.be.visible");
    cy.get(menu.getMyOrganizationIcon()).should("be.visible");
    cy.get(menu.getMyOrganizationText()).should("not.be.visible");
    cy.get(menu.getSettingsIcon()).should("be.visible");
    cy.get(menu.getSettingsText()).should("not.be.visible");
    cy.get(menu.getLogoutIcon()).should("be.visible");
    cy.get(menu.getLogoutText()).should("not.be.visible");
  }
);

Then("The user is able to test navigation between options", () => {
  cy.get(menu.getHomeIcon()).click();
  cy.location("href", { timeout: 10000 }).should("to.have.string", "/");
  cy.get(menu.getBrowseProductsIcon()).click();
  cy.location("href", { timeout: 10000 }).should("to.have.string", "/#/browse");
  cy.get(menu.getMyOrganizationIcon()).click();
  cy.location("href", { timeout: 10000 }).should("to.have.string", "/#/orgs");
  cy.get(menu.getSettingsIcon()).click();
  cy.location("href", { timeout: 10000 }).should("to.have.string", "/#/users/");
  cy.get(menu.getFQAIcon()).click();
  cy.location("href", { timeout: 10000 }).should("to.have.string", "/#/faq");
});
