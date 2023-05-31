const MATERIALS = require("../../fixtures/enums/MATERIALS");
describe("US109198 Validate subcategories in material type section", () => {
  beforeEach(() => {
    cy.initAmplify();
    cy.login();
    cy.visit("#/browse");
    cy.get("#packageType-select").click();
  });

  it("Validate ALL Content check box functionality", () => {
    cy.get(`input[type="checkbox"]`)
      .as("checkboxes").check(MATERIALS[0][0], { force: true });
    for (let i = 0; i < MATERIALS.length; i++)
      cy.wrap(MATERIALS[i]).each((type) => {
        cy.get(`input[value="${type}"]`).should("be.checked").and("have.value", type);
      });
  });

  it("Validate Each check box functionality", () => {

    for (let i = 1; i < MATERIALS.length; i++) {
      cy.get(`input[type="checkbox"]`)
        .as("checkboxes").check([MATERIALS[i][0]], { force: true });
      cy.wrap(MATERIALS[i]).each((type) => {
        cy.get(`input[value="${type}"]`).should("be.checked").and("have.value", type);
      });
    }
  });


  it("Validate each material category should reflected after it was selected", () => {
    for (let i = 1; i < MATERIALS.length; i++) {
      cy.get(`input[type="checkbox"]`)
        .as("checkboxes").check(MATERIALS[i][0], { force: true });
      cy.get(`[data-test="packageType"]`).should('contain.text', MATERIALS[i][0])
      cy.get(`@checkboxes`).uncheck(MATERIALS[i][0], { force: true })
    }
  });

  it("Should reflected ellipsis if selected more then one material type", () => {
      cy.get(`input[type="checkbox"]`)
        .as("checkboxes").check([MATERIALS[1][0], MATERIALS[2][0]], { force: true });
      cy.get(`[data-test="packageType"]`).should('contain.text', `...`)
  });



});
