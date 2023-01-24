import { When, Then } from "cypress-cucumber-preprocessor/steps";
import { ProductMaterialComponent } from "../../../pages/methods/productMaterial.component";
import { Calendar } from "../../../pages/methods/calendar.component";

const calendar = new Calendar();
const productMaterial = new ProductMaterialComponent();

When("The user click on not what you were looking for button", () => {
  cy.get(productMaterial.getNotWhatYouWereLookingFor())
    .should("be.visible")
    .click();
});

Then("The user is able to see the product material pop up", () => {
  cy.get(productMaterial.getProductMaterialPopUp()).should("be.visible");
  cy.get(productMaterial.getPopUpClose()).should("be.visible").click();
});

When("The user fill the requested information", () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  cy.get(productMaterial.getPopUpTitle())
    .should("be.visible")
    .contains("How can we help you find the information you are looking for?");
  cy.get(productMaterial.getDateInputLabel()).should(
    "have.text",
    "Effective Date"
  );
  cy.get(productMaterial.getCalendarIcon()).click();
  cy.get(productMaterial.getCalendar()).should("be.visible");
  calendar.selectDate(today);
  cy.get(productMaterial.getPopUpSearchTerms())
    .should("be.visible")
    .scrollIntoView()
    .type("new product material");
  cy.get(productMaterial.getPopUpWCWDFY())
    .should("be.visible")
    .type("new product material description");
});

Then("The user click in submit button", () => {
  cy.get(productMaterial.getPopUpSubmit()).should("be.visible").click();
});

Then("The user can see a confirmation pop up", () => {
  cy.get(productMaterial.getConfirmationMessage())
    .should("be.visible")
    .contains(
      "Your request was submitted. One of our product managers will contact you soon."
    );
  cy.get(productMaterial.getKeepBrowsingButton()).should("be.visible").click();
});
