const MATERIALS = require("../../../fixtures/enums/MATERIALS");
const BrowsePage = require("../../../support/PageObjects/BrowsePage");
const browsePage = new BrowsePage();
describe("US109198 Validate subcategories in material type section", () => {
  beforeEach(() => {
    cy.initAmplify();
    cy.login();
    cy.visit("#/browse");
    // browsePage.getMaterial().click();
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
      browsePage.selectMaterialType(MATERIALS[i][0]);
      browsePage.getMaterialTypeSection().should("contain.text", MATERIALS[i][0]);
      browsePage.unSelectMaterialType(MATERIALS[i][0]);
    }
  });


  it("Validate Each check box functionality", () => {
    browsePage.getMaterial().click();
    for (let i = 0; i < MATERIALS.length; i++) {
      let type = MATERIALS[i][0];
      browsePage.getAllCheckBox().as("checkboxes").check(type, { force: true });
      cy.get(`input[value="${type}"]`).should("be.checked").and("have.value", type);
      browsePage.getMaterialTypeSection().should("contain", type);
    }
  });


  it("Should reflected ellipsis if selected more then one material type", () => {
    const setOfMatTypes = [MATERIALS[3][0], MATERIALS[2][0]];
    browsePage.getMaterial().click();
    browsePage.getAllCheckBox()
      .as("checkboxes").check(setOfMatTypes, { force: true });
    browsePage.getMaterial().click();
    browsePage.getMaterialTypeSection().should("not.contain.text", `...`);
  });


});
