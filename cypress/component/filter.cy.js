import { FilterComponent } from "../pages/methods/filter.component";
import { BrowsePicker } from "../../src/components/BrowsePicker";

const filter = new FilterComponent();

describe("filter.cy.js", () => {
  beforeEach(() => {
    cy.mount(<BrowsePicker {...props} />);
  });
  it("Unit test 01 filter", () => {
    cy.get(filter.getBrowseProductComboBox()).click();
    cy.get(filter.getBrowseProductOptions()).contains(product).click();
  });
  it(`renders date picker`, () => {
    cy.get("[data-testid=effectiveDate]").should("exist");

    cy.get("[data-testid=effectiveDate]").type("{selectAll}02/02/2020{enter}");
    cy.contains("02/02/2020");
  });
  it(`renders search field`, () => {
    cy.get("[data-testid=browseScreenSearch]").should("exist");

    cy.get("[data-testid=browseScreenSearch]").type("fire{enter}");
    cy.get(
      '[data-testid="browseScreenSearch"] > .MuiInputBase-root > .MuiInputBase-input'
    ).contains("fire");
  });
  it(`renders browse product dropdown`, () => {
    cy.get("[data-testid=browseProduct]").should("exist");

    cy.get("[data-testid=browseProduct]").click();
    cy.get('[data-value="BOP"]').click();
  });
});
