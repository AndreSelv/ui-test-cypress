import { Given } from "cypress-cucumber-preprocessor/steps";
import { LeftSideMenuComponent } from "../../../pages/methods/leftSideMenu.component";
const menu = new LeftSideMenuComponent();

Given("The user logged into the application", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      console.log(`Device: ${size}, Orientation: ${orientation}`);
      cy.initAmplify();
      cy.login();
      cy.viewport(size, orientation);
      cy.visit("#");
      cy.get(menu.getLeftSideMenu()).should("be.visible");
    });
  });
});

Given("The user logged into the application with username", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      console.log(`Device: ${size}, Orientation: ${orientation}`);
      cy.initAmplify();
      cy.login();
      cy.viewport(size, orientation);
      cy.visit("#");
      cy.get(menu.getLeftSideMenu()).should("be.visible");
    });
  });
});
//
// When("the user call the manifest endpoint", (dataTable) => {
//   dataTable.hashes().forEach((elem) => {
//     cy.request({
//       method: "POST",
//       url: "https://asset-api-dev.aaisdirect.com/assets/v1/manifests",
//       headers: {
//         Authorization:
//           "Bearer eyJraWQiOiJGYWg0cGlmbjd2cFRrUTRRWmpSYVpLR2J2dFAzMXdcLzRIQ2E1K2pyZVZ0Yz0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiMVVtbDFSX29xTUpLTy1IMzFfcWJkUSIsInN1YiI6Ijk5ZTg1Zjc2LTA1MmMtNDljNy1iMjkwLThiNjEwNmIwZDQ3ZSIsImNvZ25pdG86Z3JvdXBzIjpbInVzLWVhc3QtMV9JVXNhZmlLcUJfT0tUQSJdLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX0lVc2FmaUtxQiIsImNvZ25pdG86dXNlcm5hbWUiOiJva3RhXzAwdWZ2YmwyOXpxa21sczZpMnA3IiwiZ2l2ZW5fbmFtZSI6IkRpZWdvIiwiYXVkIjoiNDZjaWQwaWs0MnNkYmI5NHM0NXNiazI3bWgiLCJpZGVudGl0aWVzIjpbeyJ1c2VySWQiOiIwMHVmdmJsMjl6cUttbFM2STJwNyIsInByb3ZpZGVyTmFtZSI6Ik9LVEEiLCJwcm92aWRlclR5cGUiOiJPSURDIiwiaXNzdWVyIjpudWxsLCJwcmltYXJ5IjoidHJ1ZSIsImRhdGVDcmVhdGVkIjoiMTY1MTc4MzgyODY4NyJ9XSwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NTIzODQ4NDcsIm5hbWUiOiJEaWVnbyBCb25pbGxhIiwiZXhwIjoxNjU1NDA5NzY5LCJpYXQiOjE2NTU0MDYxNjksImZhbWlseV9uYW1lIjoiQm9uaWxsYSIsImVtYWlsIjoiZGllZ29iQEFBSVNvbmxpbmUuY29tIn0.EQGM0Wn-WVUBSEQZeFWRsXEPFPCCACJ8mSjOm5IjG2jyCy7mkK-OmRssCvKG-DIxZ5LX7eeeyiu8Pb88K4qwQjK3Vm_H4L-XWq0Ef_flQoQVzPJ31247jDNtLsqd9qe_tiYmrsM-gou-b-g4qj-RV0ffR3UxQPUD-fjMr9ry6sGXiNtuamp8E9dGoR_2_8FbEvQEaf10Bo8qA_w0YIAf7TfOQcM9NeDMLpGzFCbPbb4rES_dZsLVZ02Ua2ZWrmrn5Upg2LEtWc63km3RcgUdZR2QLF0_4PWg-qaDJLeLsMYMIcfS7Qp-DiQ_TDINg4v4Ld7lq6ISpzskP0NIxaE6NQ",
//       },
//       body: {
//         product: '"' + elem.product + '"',
//         states: ['"' + elem.states + '"'],
//         packageTypes: ["FORMS", "LOSS_COST", "RULES", "RATING_INFO"],
//         persist: true,
//       },
//     }).as("manifest");
//     cy.get("@manifest").then((manifest) => {
//       expect(manifest.status).to.eq(201);
//       cy.wrap(manifest.body).should("deep.include", {
//         id: "41004cb2-6426-4a38-9514-ea95a92e5ae5",
//         homepage: "https://pre.aaisdirect.com",
//       });
//       console.log("manifest" + manifest.body);
//     });
//   });
// });
//
// Then("the user is able to download the manifest as a zip", () => {});
