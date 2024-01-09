const MATERIALS = require("../../../fixtures/enums/MATERIALS");
const BrowsePage = require("../../../support/PageObjects/BrowsePage");
const browsePage = new BrowsePage();
describe("US109198 Validate subcategories in material type section", () => {
  beforeEach(() => {
    cy.initAmplify();
    cy.login();
    cy.visit("#/browse");
    browsePage.getMaterial().click();
  });

  // it("Validate ALL Content check box functionality", () => {
  //   browsePage.getAllCheckBox()
  //     .as("checkboxes").check(MATERIALS[0][0], { force: true });
  //   for (let i = 0; i < MATERIALS.length; i++)
  //     cy.wrap(MATERIALS[i]).each((type) => {
  //       cy.get(`input[value="${type}"]`).should("be.checked").and("have.value", type);
  //     });
  // });

  it("Validate each material category should reflected after it was selected", () => {
    for (let i = 0; i < MATERIALS.length; i++) {
      browsePage.getAllCheckBox()
        .as("checkboxes").check(MATERIALS[i][0], { force: true });
      cy.wait(1000);
      browsePage.getMaterial().click();
      cy.get(`[data-test="packageType"]`).should("contain.text", MATERIALS[i][0]);
      browsePage.getMaterial().click();
      cy.get(`@checkboxes`).uncheck(MATERIALS[i][0], { force: true });
    }
  });


  it("Validate Each check box functionality", () => {

    for (let i = 0; i < MATERIALS.length; i++) {
      browsePage.getAllCheckBox()
        .as("checkboxes").check([MATERIALS[i][0]], { force: true });
      cy.wrap(MATERIALS[i]).each((type) => {
        cy.get(`input[value="${type}"]`).should("be.checked").and("have.value", type);
      });
    }
  });


  it("Should reflected ellipsis if selected more then one material type", () => {
    browsePage.getAllCheckBox()
      .as("checkboxes").check([MATERIALS[1][0], MATERIALS[2][0]], { force: true });
    browsePage.getMaterial().click();
    cy.get(`[data-test="packageType"]`).should("contain.text", `...`);
  });


});
