import uuid from "uuid/v4";

describe("Browse Results Summary", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });

        it("Validate that Cypress Test Bucket is visible", () => {
          cy.visit("#/data/buckets/48d6f1b1-3556-4649-9b62-3bf841024cba");

          cy.fixture("data/buckets/7777_5records_success.txt").as("file");
          cy.get("input[type=file]").then(function (el) {
            // convert the logo base64 string to a blob
            const blob = Cypress.Blob.base64StringToBlob(
              this.file,
              "text/plain"
            );

            const file = new File([blob], "7777_5records_success.txt", {
              type: "text/plain",
            });
            const list = new DataTransfer();

            list.items.add(file);
            const myFileList = list.files;

            el[0].files = myFileList;
            el[0].dispatchEvent(new Event("change", { bubbles: true }));
          });
        });

        it("US81324 Check loading modal and bucket detailes", () => {
          cy.intercept(
            {
              method: "GET",
              url: "/v1/buckets/48d6f1b1-3556-4649-9b62-3bf841024cba",
            },
            { fixture: "data/buckets/genericBucket.json" }
          );

          cy.visit("#/data/buckets/48d6f1b1-3556-4649-9b62-3bf841024cba");
          cy.contains("Generic Test Bucket");
          cy.contains("11/23/2020");
          cy.contains("upload file").click();
        });

        it(`US81324 handle loading from database failure with status code: 503`, () => {
          console.log(
            "running the test for the failure case with status code: ",
            503
          );
          cy.intercept(
            {
              method: "GET",
              url: "/v1/buckets",
            },
            {
              response: {
                status: 503,
                headers: {
                  "content-type": "application/json",
                },
                data: {
                  errorId: `error-id${uuid()}`,
                  friendlyErrorMessage: "Service Unavailable",
                  statusCode: 503,
                  technicalErrorMessage: "Service Unavailable",
                },
              },
            }
          );
          cy.visit("#/data");
          cy.contains("Loading");
          cy.contains("Page is loading. Please wait.");
          cy.wait(90000);
          cy.contains("Loading the page failed. Please try again later.");
          cy.contains("GO HOME").click();
        });

        const allStatusCodes = [
          {
            status: 400,
            errorId: `error-id${uuid()}`,
            friendlyErrorMessage: "Bad Request",
            technicalErrorMessage: "Bad Request",
          },
          {
            status: 404,
            errorId: `error-id${uuid()}`,
            friendlyErrorMessage: "item not found",
            technicalErrorMessage: "Bad Request",
          },
          {
            status: 500,
            errorId: `error-id${uuid()}`,
            friendlyErrorMessage: "Internal Server Error",
            technicalErrorMessage: "Internal Server Error",
          },
        ];

        allStatusCodes.map((response) => {
          it(`US81324 handle loading from database failure with status code: ${response.status}`, () => {
            console.log(
              "running the test for the failure case with status code: ",
              response.status
            );
            cy.intercept(
              {
                method: "GET",
                url: "/v1/buckets",
              },
              {
                response: {
                  status: response.status,
                  headers: {
                    "content-type": "application/json",
                  },
                  data: {
                    errorId: response.errorId,
                    friendlyErrorMessage: response.friendlyErrorMessage,
                    statusCode: response.status,
                    technicalErrorMessage: response.technicalErrorMessage,
                  },
                },
              }
            );
            cy.visit("#/data");
            cy.contains("Loading the page failed. Please try again later.");
            cy.contains("GO HOME").click();
          });
        });
      });
    });
  });
});
