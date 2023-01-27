describe("Check the Address Information of An Org", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();
          cy.bootStrapOrg1();

          cy.viewport(size, orientation);
        });

        it.skip("Remove 701 Warrenville Rd Address", () => {
          cy.visit("#/orgs/org1");

        cy.fixture("orgs/org1/org1").then((org1) => {
              org1.addresses.billing = [
              {
                formattedAddress: "701 Warrenville Rd, Lisle, IL 60532, USA",
                createdBy: "659a5e72-01c2-41dc-b962-e797b25d1636",
                created: "2020-05-11T20:52:12.343Z",
                placeId: "ChIJjcO_8mtRDogRGbjEYjMWLts",
                addressComponents:
                  '[{"long_name":"701","short_name":"701","types":["street_number"]},{"long_name":"Warrenville Road","short_name":"Warrenville Rd","types":["route"]},{"long_name":"Lisle","short_name":"Lisle","types":["locality","political"]},{"long_name":"Lisle Township","short_name":"Lisle Township","types":["administrative_area_level_3","political"]},{"long_name":"DuPage County","short_name":"Dupage County","types":["administrative_area_level_2","political"]},{"long_name":"Illinois","short_name":"IL","types":["administrative_area_level_1","political"]},{"long_name":"United States","short_name":"US","types":["country","political"]},{"long_name":"60532","short_name":"60532","types":["postal_code"]}]',
                addressLine2: null,
                addressId: "address1",
              },
            ];

            cy.intercept("GET", `/orgs/org1`, org1).as("getEmail");
          });

          cy.get(':nth-child(3) > .MuiTab-wrapper').click();
          cy.get(
            '[data-test="Action-701 Warrenville Rd, Lisle, IL 60532, USA"]'
          )
            .contains("REMOVE")
            .click()
            .should("not.exist");
        });

        it.skip("Add Another Mailing Address", () => {
          cy.visit("#/orgs/org1");
          cy.fixture("orgs/org1/org1").then((org1) => {
            org1.addresses.mailing.push({
              formattedAddress: "1239 Avignon Dr, Conyers, GA 30094, USA",
              createdBy: "7cd03f7e-2e5d-4a39-99aa-87228f2ffcd9",
              created: "2019-07-30T17:28:44.309Z",
              placeId: "ChIJKSAm4v5M9IgRZ1W2oQQv8t0",
              addressComponents:
                '[{"long_name":"1239","short_name":"1239","types":["street_number"]},{"long_name":"Avignon Drive","short_name":"Avignon Dr","types":["route"]},{"long_name":"Conyers","short_name":"Conyers","types":["locality","political"]},{"long_name":"Rockdale County","short_name":"Rockdale County","types":["administrative_area_level_2","political"]},{"long_name":"Georgia","short_name":"GA","types":["administrative_area_level_1","political"]},{"long_name":"United States","short_name":"US","types":["country","political"]},{"long_name":"30094","short_name":"30094","types":["postal_code"]}]',
              addressLine2: "Att: ANN",
              addressId: "7302920b-0f46-4ed8-b86d-2523024a9977",
            });
            cy.route("GET", "/orgs/org1", org1);
          });
          cy.contains("ADDRESSES").click();
          cy.get('[data-test="Add-Mailing Address"]')
            .find("[data-test=Add]")
            .click();
          // FIXME: Remove "top" and Click the Button, not the Icon. "data-test=Add" points at the icon.

          cy.get(".geosuggest__input")
            .click()
            .type("1239 Avignon Dr, Conyers, GA 30094, USA{downarrow}{enter}");
          cy.contains("OK").click();
          cy.get('[data-test="Mailing Address"]').should(
            "contain",
            "1239 Avignon Dr"
          );
        });

        it("Add A Billing Address", () => {
          cy.visit("#/orgs/org1");
            cy.fixture("orgs/org1/org1").then((org1) => {
            
              org1.addresses.billing = [
              {
                formattedAddress: "701 Warrenville Rd, Lisle, IL 60532, USA",
                createdBy: "659a5e72-01c2-41dc-b962-e797b25d1636",
                created: "2020-05-11T20:52:12.343Z",
                placeId: "ChIJjcO_8mtRDogRGbjEYjMWLts",
                addressComponents:
                  '[{"long_name":"701","short_name":"701","types":["street_number"]},{"long_name":"Warrenville Road","short_name":"Warrenville Rd","types":["route"]},{"long_name":"Lisle","short_name":"Lisle","types":["locality","political"]},{"long_name":"Lisle Township","short_name":"Lisle Township","types":["administrative_area_level_3","political"]},{"long_name":"DuPage County","short_name":"Dupage County","types":["administrative_area_level_2","political"]},{"long_name":"Illinois","short_name":"IL","types":["administrative_area_level_1","political"]},{"long_name":"United States","short_name":"US","types":["country","political"]},{"long_name":"60532","short_name":"60532","types":["postal_code"]}]',
                addressLine2: null,
                addressId: "address1",
              },
            ];

            cy.intercept("GET", `/orgs/org1`, org1).as("getEmail");
          });

          cy.get(':nth-child(3) > .MuiTab-wrapper').click();

          cy.get('[data-test="Add-Billing Address"]')
            .find("[data-test=Add]")
            .click({ force: true }); // FIXME
          cy.get(".geosuggest__input").click().type("701 Warrenville Rd");
          cy.contains("OK").click();
          cy.get('[data-test="Billing Address"]').should(
            "contain",
            "701 Warrenville Rd"
          );
        });
      });
    });
  });
});
