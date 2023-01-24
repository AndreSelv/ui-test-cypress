// import uuid from "uuid/v4";
//
// describe.skip("Brows Results Summary", () => {
//   Cypress.env("SIZES").forEach((size) => {
//     Cypress.env("ORIENTATION").forEach((orientation) => {
//       describe(`Device: ${size}, Orientation: ${orientation}`, () => {
//         beforeEach(() => {
//           cy.initAmplify();
//           cy.login();
//
//           cy.viewport(size, orientation);
//         });
//
//         it("Validate that Cypress Test Bucket is visible", () => {
//           cy.visit("#/data");
//           cy.contains("Cypress Test Bucket");
//           cy.get('[data-test="buckets-listitem-Cypress Test Bucket"]')
//             .scrollIntoView()
//             .contains("open")
//             .click();
//         });
//
//         //Checking if the loading component on GT2 Page shows
//         //at first and goes away when the data get received.
//         it("US81324 Check loading component functionality", () => {
//           cy.visit("#/data");
//           // cy.wait(5000);
//           // cy.contains("Loading");
//           // cy.contains("Page is loading. Please wait.");
//           cy.contains("Cypress Test Bucket");
//           cy.contains("GT2 Buckets");
//           cy.get('[data-test="buckets-listitem-Cypress Test Bucket"]')
//             .contains("open")
//             .click();
//         });
//
//         const allStatusCodes = [
//           {
//             status: 400,
//             errorId: `error-id${uuid()}`,
//             friendlyErrorMessage: "Bad Request",
//             technicalErrorMessage: "Bad Request",
//           },
//           {
//             status: 404,
//             errorId: `error-id${uuid()}`,
//             friendlyErrorMessage: "item not found",
//             technicalErrorMessage: "Bad Request",
//           },
//           {
//             status: 500,
//             errorId: `error-id${uuid()}`,
//             friendlyErrorMessage: "Internal Server Error",
//             technicalErrorMessage: "Internal Server Error",
//           },
//         ];
//         // Handling all cases of failure with status codes: 400, 404, 500
//         allStatusCodes.forEach((response) => {
//           it(`US81324 handle loading from database failure with status code: ${response.status}`, () => {
//             console.log(
//               "running the test for the failure case with status code: ",
//               response.status
//             );
//             cy.intercept(
//               {
//                 method: "GET",
//                 url: "/v1/buckets",
//               },
//               {
//                 response: {
//                   status: response.status,
//                   headers: {
//                     "content-type": "application/json",
//                   },
//                   data: {
//                     errorId: response.errorId,
//                     friendlyErrorMessage: response.friendlyErrorMessage,
//                     statusCode: response.status,
//                     technicalErrorMessage: response.technicalErrorMessage,
//                   },
//                 },
//               }
//             );
//             cy.visit("#/data");
//             cy.contains("Loading");
//             cy.contains("Page is loading. Please wait.");
//             cy.contains("Loading the page failed. Please try again later.");
//             cy.contains("GO HOME").click();
//           });
//         });
//
//         it("US81324 check that create bucket button cannot be clicked", () => {
//           cy.intercept(
//             {
//               method: "GET",
//               url: "/v1/buckets",
//             },
//             { fixture: "data/buckets/genericBucketsFailureScenario500.json" }
//           );
//
//           cy.visit("#/data");
//           cy.contains("Loading the page failed. Please try again later.");
//           cy.get(".MuiDialog-container").click(); //simulating clicking on the backdrop to prove that the dialogue does not go away.
//           cy.contains("Loading the page failed. Please try again later.");
//           cy.contains("GO HOME").click();
//         });
//
//         it(`US81324 handle loading from database failure with status code: 503`, () => {
//           // Handling the case when the front end sends request to the back end every 3 seconds
//           // more than 3 minutes and doesn't get a response back, and gets 503 response.
//           console.log(
//             "running the test for the failure case with status code: ",
//             503
//           );
//           cy.intercept(
//             {
//               method: "GET",
//               url: "/v1/buckets",
//             },
//             {
//               response: {
//                 status: 503,
//                 headers: {
//                   "content-type": "application/json",
//                 },
//                 data: {
//                   errorId: `error-id${uuid()}`,
//                   friendlyErrorMessage: "Service Unavailable",
//                   statusCode: 503,
//                   technicalErrorMessage: "Service Unavailable",
//                 },
//               },
//             }
//           );
//           cy.visit("#/data");
//           cy.contains("Loading");
//           cy.contains("Page is loading. Please wait.");
//           cy.wait(90000);
//           cy.contains("Loading the page failed. Please try again later.");
//           cy.contains("GO HOME").click();
//         });
//       });
//     });
//   });
// });
