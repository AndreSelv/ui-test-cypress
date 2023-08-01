const LINES = require("../../fixtures/enums/LINES");
describe("Brows Results Summary", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });

        it("validate no browse each results", () => {
          // cy.intercept("POST", "/assets/v1/search", { fixture: "browse/noBrowseResult.json" });
          cy.visit("#/browse");
          cy.get("#product-select").type("YT - {downArrow}{enter}{esc}");
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectCO]").click().type("{esc}");
          // cy.get("#packageType-select").type("Loss Cost{downArrow}{enter}{esc}");
          cy.get("[data-test=browseScreenSearch]").type("water{enter}");
          cy.contains("0 results");
        });

        it("validate browse search returns 1 result", () => {
          // cy.intercept("POST", "/assets/v1/search", { fixture: "browse/oneBrowseResult.json" });
          cy.visit("#/browse");
          cy.get("#product-select").type("CA - {downArrow}{enter}{esc}");
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectPA]").click().type("{esc}");
          cy.get("#packageType-select").click();
          cy.get(`input[type="checkbox"]`)
            .as("checkboxes").check("Forms and Endorsements List", { force: true });
          cy.get("#packageType-select").click();
          cy.contains("1 results");
        });

        it("validate browse search returns more than 1 result", () => {
          // cy.intercept("POST", "/assets/v1/search", { fixture: "browse/manyBrowseResults.json" });
          cy.visit("#/browse");
          cy.get("#product-select").type("YT - {downArrow}{enter}{esc}");
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectCO]").click().type("{esc}");
          cy.get("[data-test=browseScreenSearch]").type("IMG{enter}");
          cy.contains("11 results");
        });

        it.skip("validate download button functionality", () => {
          // cy.intercept("POST", "/assets/v1/search", { fixture: "browse/largeAmountData.json" });
          cy.visit("#/browse");
          cy.get("#product-select").type("HO -{downArrow}{enter}{esc}", { delay: 50 });
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectIA]").click().type("{esc}");
          cy.get("#packageType-select").type("Forms{downArrow}{enter}{esc}");

          cy.contains(`1084 results`);
          cy.get("[data-test=\"browseScreen-item-download-button\"]").should("be.enabled");
          cy.get("[data-test=\"browseScreen-item-download-button\"]").click();
          cy.get(".MuiDialogActions-root > .MuiButton-textPrimary").click();
          cy.contains("Downloading Content").should("be.visible");

          //cy.task("deleteFolder", Cypress.config("downloadsFolder"));
          //cy.contains("Downloading Content").should("not.be.visible").end();
          //cy.readFile("cypress\\downloads\\AAIS.zip").should("exist");

          // cy.task('countFiles', 'cypress/downloads').then((count) => {
          //   expect(count).eqls(1);
          // })

        });
        it.skip("TC4941 Validate that download modal contains download link", () => {
          // cy.intercept("POST", "/assets/v1/search", { fixture: "browse/largeAmountData.json" });
          cy.visit("#/browse");
          cy.get("#product-select").type("HO -{downArrow}{enter}{esc}", { delay: 50 });
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectIA]").click().type("{esc}");
          cy.get("[data-test=\"browseScreen-item-download-button\"]").click();
          cy.get(".MuiDialogActions-root > .MuiButton-textPrimary").click();
          cy.contains("Downloading Content", { timeout: 20000 }).should("be.visible");
          cy.contains("Go To Download Page", { timeout: 70000 }).should("be.visible");
        });


        it("validate that effective date is persist on the search filter", () => {
          // cy.intercept("POST", "/assets/v1/search", { fixture: "browse/oneBrowseResult.json" });
          cy.visit("#/browse");
          cy.contains("Effective Date").should("be.visible");
          cy.get(":nth-child(1) > .MuiInputBase-root > .MuiButtonBase-root").click({ force: true });
          cy.get(".MuiCalendarPicker-root").should("be.visible");
        });

        it("validate that oldest effective date is persist on the search filter", () => {
          // cy.intercept("POST", "/assets/v1/search", { fixture: "browse/oneBrowseResult.json" });
          cy.visit("#/browse");
          cy.contains("Oldest Date").should("be.visible");
          cy.get(":nth-child(2) > .MuiInputBase-root > .MuiButtonBase-root").click({ force: true });
          cy.get(".MuiCalendarPicker-root").should("be.visible");
        });

        it("validate that browser result page contains all results depends on screen resolutions", () => {
          // cy.intercept("POST", "/assets/v1/search", { fixture: "browse/largeAmountData.json" });
          cy.viewport(3000, 2500);
          cy.visit("#/browse");
          cy.get("#product-select").type("HO - {downArrow}{enter}{esc}");
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectIA]").click().type("{esc}");
          cy.get(`span:contains("more")`).its("length").should("be.gte", 60);
          cy.xpath(`//div[@class="MuiCircularProgress-root MuiCircularProgress-colorPrimary MuiCircularProgress-indeterminate"]`)
            .find(`circle[class="MuiCircularProgress-circle MuiCircularProgress-circleIndeterminate"]`)
            .should("be.visible");
        });

        it("US112654 Validate visibility form and edition numbers in the Forms", () => {
          cy.visit("#/browse");
          cy.get("#product-select").click();
          cy.get("#product-select").type("AGXL - {downArrow}{enter}{esc}");

          cy.get("#packageType-select").click();
          cy.get(`input[type="checkbox"]`)
            .as("checkboxes").check("Forms", { force: true });
          cy.get("#packageType-select").click();

          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectALLSTATES]").click();

          cy.xpath(`//div[contains(@class, "infinite-scroll-component ")]//p`).each(($el) => {
            //First 2 characters should contain UpperCase Letters only
            expect($el.text().substring(0, 2), `First 2 characters should be Letter and Upper case - ${$el.text()}`).to.match(/^[A-Z]+$/);
            //Numbers and editions validations it should contain digits and spaces only
            expect($el.text().substring(3, 13), `Publications should contains Form and edition numbers - ${$el.text().substring(3, 13)}`).to.match(/^[\d ]*$/);
          });
        });

        it.skip("Validate visibility form and edition numbers in the Forms for All Product Lines", () => {
          cy.visit("#/browse");
          cy.get("[data-test=addState]").click();
          cy.get("[data-test=selectALLSTATES]").click();
          cy.get("#packageType-select").click();
          cy.get(`input[type="checkbox"]`)
            .as("checkboxes").check("Forms", { force: true });
          cy.get("#packageType-select").click();

          cy.wrap(LINES).each((line) => {
            cy.get("#product-select").click();
            cy.contains(line.title).click();
            cy.get(`div[data-test="browseProduct"]`).should("contain.text", line.title);
            cy.get("#product-select").click();
            cy.xpath("//h6/../p").each(($el) => {
              if ($el.text().substring(0, 1) !== "0") {
                cy.xpath(`//div[contains(@class, "infinite-scroll-component ")]//p`).each(($el) => {
                  // expect(/^[A-Za-z\s]*$/.test($el.text().substring(0, 3))).eq(true);
                  // expect(/^\d+$/.test($el.text().substring(3, 7)), `Publications - ${$el.text()}`).eq(true);
                  expect($el.text().substring(0, 2), `First 2 characters ${$el.text().substring(0, 2)}`).to.match(/^[A-Za-z\s]*$/);
                  // expect($el.text().substring(3, 13), `Publications - ${$el.text()}`).to.match(/^[\d ]*$/);
                  expect($el.text().substring(0, 2), `Publications - ${$el.text()}`).to.match(/^[A-Z]+$/);
                });
              }
            });
            cy.xpath(`(//*[@data-testid="CloseIcon"])[1]`).click({ force: true });
          });
        });
      });
    });
  });
});
