const BrowsePage = require("../../../support/PageObjects/BrowsePage");
const browsePage = new BrowsePage();
describe("US121289 Material and SubMaterial types grouping", () => {
  beforeEach(() => {
    cy.initAmplify();
    cy.login();
    cy.visit("#/browse");
  });

  const product = "AGOP";
  const type = "Manual Materials";

  it("US121289 Material and SubMaterial types persistence in the filter", () => {
    browsePage.getMaterialTypesGroupe().should("be.visible");
    browsePage.getMaterialSubTypesGroupe().should("be.visible");
  });
  it("Material and SubMaterial types dropdown func", () => {
    browsePage.getMaterialTypesGroupe().click({ force: true });
    browsePage.getDropdownSection().should("be.visible");
    browsePage.getMaterialTypesGroupe().click({ force: true });
    browsePage.getMaterialSubTypesGroupe().click({ force: true });
    browsePage.getDropdownSection().should("be.visible");
    browsePage.getMaterialSubTypesGroupe().click({ force: true });
  });


  it("US121289 Material Type selection", () => {
    browsePage.selectProduct("AGXL");
    browsePage.selectMaterialType("Advisory Information");
    browsePage.getMaterialTypesGroupe().click({ force: true });
    cy.wait(500);
    browsePage.getListOfTypes().then(($div) => {
      const text = $div.text();
      const count = $div.text().match(/\d+/g).join([]);
      browsePage.getDropdownSection().should("be.visible").contains(`Advisory Information: ${count}`).click({ force: true });
      browsePage.publicationsShouldBeEqual(parseInt(count));
    });
    browsePage.getMaterialTypesGroupe().click({ force: true });
  });

  it("US121289 SubMaterial Type selection", () => {
    browsePage.selectProduct(product);
    browsePage.selectMaterialType(type);
    browsePage.getListOfSubTypes().then((list) => {
      for (let i = 1; i < list.length + 1; i++) {
        cy.wait(500);
        browsePage.getListOfTypes(i).then(($div) => {
          const text = $div.text().replace(/\d+/g, "").replace(":", "").trim();
          const count = $div.text().match(/\d+/g).join([]);
          browsePage.getDropdownSection().should("be.visible").contains(text.trim()).click({ force: true });
          browsePage.getResultFromBar().then(($el) => {
            expect($el.text()).contains(count);
          });
          browsePage.unSelectMaterialSubType(text);
        });
      }
    });
  });
});