describe("Validate User Interface Hubspot functionalities", () => {
  beforeEach(() => {
    cy.initAmplify();
    cy.login();
  });

  it("Validate positive request to Hubspot with all required data ", () => {
    cy.visit("#/browse");
    cy.get("#product-select").type("IMG - {downArrow}{enter}{esc}");
    cy.get("#classes-select").should("be.visible");
    cy.get("#classes-select").click();
    cy.contains("BCF").click();
    cy.get("#classes-select").click();
    cy.get("[data-test=addState]").click();
    cy.get("[data-test=selectCA]").click().type("{esc}");
    cy.get("#packageType-select").click();
    cy.get(`input[type="checkbox"]`)
      .as("checkboxes").check(["Forms", "IMG Publications"], { force: true });
    cy.get("#packageType-select").click();
    // cy.get('.css-j7qwjs > :nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').click().type("07/26/2023",{ force: true });
    // cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').click().type("07/26/2013",{ force: true });

    //Select effective date
    cy.get(".css-j7qwjs > :nth-child(1) > .MuiInputBase-root > .MuiInputBase-input").click({ force: true });
    cy.get(":nth-child(5) > :nth-child(4) > .MuiButtonBase-root").click({ force: true });

    cy.get("[data-test=browseScreenSearch]").type("Fire{enter}",{ force: true });
    cy.get("[data-test=\"browseScreen-item-product-request-button\"]").click({ force: true });
    cy.get("[data-test=\"request-modal-additional-info\"]").type("Test");
    cy.get("[data-test=\"submit-modal-request\"]").should("be.enabled").click({ force: true });
    cy.get("#alert-dialog-description").should("include.text", "Your request was submitted. One of our product managers will contact you soon.");
  });

  it("Validate required field for submitting hubspot form", () => {
    cy.visit("#/browse");
    cy.get(".MuiGrid-grid-md-9").should("not.contain.text", "Not what you were looking for?");

    cy.get("#product-select").type("IMG{downArrow}{enter}{esc}");
    cy.get(".MuiGrid-grid-md-9").should("not.contain.text", "Not what you were looking for?");

    cy.get("#classes-select").should("be.visible");
    cy.get("#classes-select").click();
    cy.contains("BCF").click();
    cy.get("#classes-select").click();
    cy.get(".MuiGrid-grid-md-9").should("not.contain.text", "Not what you were looking for?");

    cy.get("[data-test=addState]").click();
    cy.get("[data-test=selectCA]").click().type("{esc}");
    cy.get(".MuiGrid-grid-md-9").should("contain.text", "Not what you were looking for?");
    cy.get("[data-test=\"browseScreen-item-product-request-button\"]").should("be.visible").click();

    cy.get("[data-test=\"request-modal-additional-info\"]").type("Test");
    cy.get("[data-test=\"submit-modal-request\"]").should("be.enabled").click();
    cy.get("#alert-dialog-description").should("include.text", "Your request was submitted. One of our product managers will contact you soon.");

  });

  it("Validate negative scenario of submitting form ", () => {
    cy.visit("#/browse");
    cy.get(".MuiGrid-grid-md-9").should("not.contain.text", "Not what you were looking for?");

    cy.get("#product-select").type("AGGL - {downArrow}{enter}{esc}");
    cy.get(".MuiGrid-grid-md-9").should("not.contain.text", "Not what you were looking for?");

    cy.get("#packageType-select").click();
    cy.get(`input[type="checkbox"]`)
      .as("checkboxes").check(["Forms", "IMG Publications"], { force: true });
    cy.get("#packageType-select").click();
    cy.get(".MuiGrid-grid-md-9").should("not.contain.text", "Not what you were looking for?");

    // cy.get('.css-j7qwjs > :nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').click({force:true}).type("07/26/2023",{ force: true });
    //Select effective date
    cy.get(".css-j7qwjs > :nth-child(1) > .MuiInputBase-root > .MuiInputBase-input").click({ force: true });
    cy.get(":nth-child(5) > :nth-child(4) > .MuiButtonBase-root").click({ force: true });
    cy.get(".MuiGrid-grid-md-9").should("not.contain.text", "Not what you were looking for?");

    // cy.get('.css-j7qwjs > :nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').click({force:true}).type("07/26/2013",{ force: true });

    cy.get("[data-test=browseScreenSearch]").type("Fire{enter}",{ force: true });
    cy.get(".MuiGrid-grid-md-9").should("not.contain.text", "Not what you were looking for?");
  });

});
