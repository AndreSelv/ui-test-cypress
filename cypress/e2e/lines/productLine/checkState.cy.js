const LinesPage = require("../../../support/PageObjects/LinesPage");
const linesPage = new LinesPage();
describe("Check State", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });

        it("US65528 Select Multistate (MU)", () => {
          cy.visit("#/lines/BOP");
          linesPage.selectState("MU");
          linesPage.validateThatStateSelected("MU");
        });

        it("US65598 Remove State", () => {
          cy.visit("#/lines/BOP");
          linesPage.selectState("MU");
          linesPage.deleteState("MU");
          cy.contains("No state added");
        });

        it("US65598 Select Multiple States", () => {
          cy.visit("#/lines/BOP");
          linesPage.selectState("MU");
          linesPage.validateThatStateSelected("MU");
          linesPage.selectState("FL");
          linesPage.validateThatStateSelected("FL");
          linesPage.selectState("GA");
          linesPage.validateThatStateSelected("GA");
          linesPage.deleteState("MU");
          linesPage.deleteState("FL");
          linesPage.deleteState("GA");
        });
      });
    });
  });
});
