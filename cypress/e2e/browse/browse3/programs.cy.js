const BrowsePage = require("../../../support/PageObjects/BrowsePage");
const browsePage = new BrowsePage();


describe("Programs persistent", () => {

  beforeEach(() => {
    cy.initAmplify();
    cy.login();
  });

  it("validate that user can get result with Programs selection for PUP - Commercial Liability (w/ CLT", () => {
    cy.visit("#/browse");
    browsePage.selectProduct("PUP", "PPL", "DP", "FO", "CL");
    browsePage.selectState("AL");
    browsePage.selectPrograms("Personal Umbrella - Monoline", "Personal Umbrella - Packaged", "Commercial Liability Program", "Owners & Contractors Protective Program",
      "Farmowners Program", "Home-Based Business Program", "Dwelling Properties Program", "Landlord's Premises Only Liability Coverage Option", "Personal / Farm Personal Liability Program", "Premises Only Liability Program",
    );
  });


  it("validate that user can get result with Programs selection for CL - Commercial Liability (w/ CLT", () => {
    cy.visit("#/browse");
    browsePage.selectProduct("CL");
    browsePage.selectState("AL");
    browsePage.selectPrograms("Commercial Liability Program");
    browsePage.publicationsShouldBeGreaterThen(1);
    browsePage.selectPrograms( "Owners & Contractors Protective Program");
    browsePage.publicationsShouldBeGreaterThen(1);
  });
  it("validate that user can get result with Programs selection for FO - Commercial Liability (w/ CLT", () => {
    cy.visit("#/browse");
    browsePage.selectProduct("FO");
    browsePage.selectState("AL");
    browsePage.selectPrograms("Farmowners Program",);
    browsePage.publicationsShouldBeGreaterThen(1);
    browsePage.selectPrograms("Home-Based Business Program");
    browsePage.publicationsShouldBeGreaterThen(1);
  });
  it("validate that user can get result with Programs selection for DP - Commercial Liability (w/ CLT", () => {
    cy.visit("#/browse");
    browsePage.selectProduct("DP");
    browsePage.selectState("AL");
    browsePage.selectPrograms("Dwelling Properties Program");
    browsePage.publicationsShouldBeGreaterThen(1);
    browsePage.selectPrograms("Landlord's Premises Only Liability Coverage Option");
    browsePage.publicationsShouldBeGreaterThen(1);
  });
  it("validate that user can get result with Programs selection for PPL - Commercial Liability (w/ CLT", () => {
    cy.visit("#/browse");
    browsePage.selectProduct("PPL");
    browsePage.selectState("AL");
    browsePage.selectPrograms("Personal / Farm Personal Liability Program");
    browsePage.publicationsShouldBeGreaterThen(1);
    browsePage.selectPrograms("Premises Only Liability Program");
    browsePage.publicationsShouldBeGreaterThen(1);
  });
  it("validate that user can get result with Programs selection for PUP - Commercial Liability (w/ CLT", () => {
    cy.visit("#/browse");
    browsePage.selectProduct("PUP");
    browsePage.selectState("AL");
    browsePage.selectPrograms("Personal Umbrella - Monoline");
    browsePage.publicationsShouldBeGreaterThen(1);
    browsePage.selectPrograms("Personal Umbrella - Packaged");
    browsePage.publicationsShouldBeGreaterThen(1);
  });



  it("validate that user can get result with multiple HO plans selection", () => {
    cy.visit("#/browse");
    browsePage.selectProduct("HO");
    browsePage.selectState("AL");
    browsePage.selectPlans("By Peril", "Com");
    browsePage.selectMaterialType("Manual Materials");
    browsePage.selectMaterialSubType("State Pages");
    browsePage.publicationsShouldBeEqual(11);
    // browsePage.publicationsShouldBeEqual(28);
  });
});
