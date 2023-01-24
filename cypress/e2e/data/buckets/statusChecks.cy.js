describe.skip("Check upload progress", () => {
  Cypress.env("SIZES").forEach((size) => {
    Cypress.env("ORIENTATION").forEach((orientation) => {
      describe(`Device: ${size}, Orientation: ${orientation}`, () => {
        beforeEach(() => {
          cy.initAmplify();
          cy.login();

          cy.viewport(size, orientation);
        });

        it("[US80535]: Check for different file status", () => {
          cy.intercept(
            {
              method: "GET", // Route all GET requests
              url:
                "https://mds-api-dev.aaisdirect.com/v1/buckets/48d6f1b1-3556-4649-9b62-3bf841024cba/files", // that have a URL that matches '/users/*'
            },
            { fixture: "data/buckets/uploadingChecks.json" }
          );
          cy.intercept(
            {
              method: "GET", // Route all GET requests
              url:
                "https://mds-api-dev.aaisdirect.com/v1/buckets/48d6f1b1-3556-4649-9b62-3bf841024cba", // that have a URL that matches '/users/*'
            },
            { fixture: "data/buckets/genericBucket.json" }
          );

          cy.visit("#/data/buckets/48d6f1b1-3556-4649-9b62-3bf841024cba");

          cy.contains("Uploading... 0% (Do not close browser)");
          cy.contains("Uploading... 50% (Do not close browser)");
          cy.contains("Uploading... 100% (Do not close browser)");
          cy.contains("Upload failed");
          cy.contains("Upload the file and try again");
          cy.contains("File Received. It's now safe to close the browser");
          cy.contains("Processing File with 123,456,789 records");
          cy.contains("Processing File with N/A records");
          cy.contains("Process Completed");
          cy.contains("Processed 9,999 records");
          cy.contains("Processed N/A records");
          cy.contains("Unknown Status");
          cy.contains("Please Contact AAIS");
        });
      });
    });
  });
});
