import { When, Then } from "cypress-cucumber-preprocessor/steps";
import { FilterComponent } from "../../../pages/methods/filter.component";
import { Calendar } from "../../../pages/methods/calendar.component";

const filter = new FilterComponent();
const calendar = new Calendar();

When("The user browse all AAIS products", () => {
  cy.visit("#/browse");
});

When(/^The user selects the "([^"]*)" product$/, (product) => {
  cy.get(filter.getBrowseProductComboBox()).type(`${product}{downArrow}{enter}{esc}`)
  //cy.get(filter.getBrowseProductOptions()).contains(product).click();
});

When(/^The user adds the "([^"]*)" state$/, (state) => {
  cy.get(filter.getAddState()).click();
  cy.get(`[data-test=select${state}]`).click().type("{esc}");
});

When(/^The user selects the "([^"]*)" material type$/, (mtype) => {
  cy.get(filter.getMaterialTypeComboBox()).type(`${mtype}{downArrow}{enter}{esc}`);
});


When(/^The user selects the "([^"]*)" date$/, (date) => {
  cy.get(filter.getCalendarIcon()).click();
  cy.get(filter.getCalendar()).should("be.visible");
  calendar.selectDate(date);
});

When(/^The user sets the "([^"]*)" date$/, (date) => {
  cy.get(filter.getDateInput()).dblclick({ force: true });
  cy.get(filter.getDateInput()).type("{selectall}");
  cy.get(filter.getDateInput()).invoke("val", date).trigger("change");
});

When(/^The user validates the date field name is effective date$/, () => {
  cy.get(filter.getDateInputLabel()).should("have.text", "Effective Date");
});

When(
  /^The user validates the date field by default shows the date, month, year as per the system date$/,
  () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    cy.get(filter.getDateInput())
      .invoke("val")
      .then((text) => {
        expect(text.trim()).equal(today);
      });
  }
);

When(/^The user types "([^"]*)" in the searchbox$/, (text) => {
  cy.get(filter.getSearchInput()).type(text + "{enter}");
});

When(
  "The user validates the calendar component is active when the date field is clicked",
  () => {
    cy.get(filter.getCalendarIcon()).click({ force: true });
    cy.get(filter.getCalendar()).should("be.visible");
  }
);

Then(
  "The user validates that the date picker is closed correctly by clicking outside",
  () => {
    cy.get(filter.getCalendarIcon()).click({ force: true });
    cy.get(filter.getCalendar()).should("not.be.visible");
  }
);

Then("The user is able to see the results", () => {
  cy.contains("1 results");
});
