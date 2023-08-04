const LinesPage = require("../../../support/PageObjects/LinesPage");
const linesPage = new LinesPage();
describe("Downloading Product Materials", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });
        it("Product Materials are successfully downloaded", () => {
          cy.visit("#/lines/BOP");
          linesPage.selectState("CO")
          linesPage.getDownloadButton().click()
          linesPage.getAlertDialogDescriptionsMessage().contains(linesPage.successDownloadMessage())
        });
      });
    });
  });
});
