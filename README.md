# Documentation: clear on how to test from scratch

<head><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous"></head>

### Getting Started

1. Install the npm dependencies for the project
   `npm install`
2. Run the project locally
   `npm start`
3. Open the [Cypress](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Add-a-test-file) testing tool to get instructions
   `npx cypress open`

### Testing Commands(Optional)

#### `npm run test`

Run the test cases and generate a report. App needs to be running

#### `$PSDefaultParameterValues['Out-File:Encoding'] = 'utf8'`

If you are on windows and want to generate reports run this in a powershell terminal

### e2e test and report

1. Runs a end to end test with cypress
   `npm run e2e-test`
2. Generate a end to end test report. You need to run the `e2e-test` first.
   `npm run e2e-test-report`

### Responsive Testing

1. Control the size of the screen for the application (more/link)
2. Change the orientation of the screen
   - portrait
   - landscape

### Cross Browser Testing

<table>
   <thead>
      <tr>
         <th>BROWSERS</th>
         <th>VERSIONS</th>
         <th>COMMANDS</th>
         <th>DESCRIPTION</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td rowspan=2><i style="color:blue" class="fab fa-chrome"></i> Chrome</td>
         <td><a href="https://www.google.com/chrome">Latest</a></td>
         <td><pre>npm run cy:run-chrome</pre></td>
         <td></td>
      </tr>
      <tr>
         <td><a href="https://www.google.com/chrome">Canary</a></td>
         <td><pre>npm run cy:run-chrome:canary</pre></td>
         <td>A version of google chrome for developers. Each release of google chrome comes about a week before the full version is updated</td>
      </tr>
      <tr>
         <td rowspan=2><i style="color:blue" class="fab fa-edge"></i> Edge</td>
         <td><a href="https://www.microsoft.com/en-us/edge">Latest</a></td>
         <td><pre>npm run cy:run-edge</pre></td>
         <td>Developed by Microsoft</td>
      </tr>
      <tr>
         <td><a href="https://www.microsoftedgeinsider.com/en-us/download">Canary</a></td>
         <td><pre>npm run cy:run-edge:canary</pre></td>
         <td></td>
      </tr>
      <tr>
         <td><i style="color:blue" class="fas fa-atom"></i>   Electron</td>
         <td><a href="https://www.electronjs.org/">Latest</a></td>
         <td><pre>npm run cy:run-electron</pre></td>
         <td>A version of Chromium that comes with Electron, it does not need to be installed separately.</td>
      </tr>
      <tr>
         <td rowspan=3><i style="color:blue" class="fab fa-firefox"></i> Firefox</td>
         <td><a href="https://www.mozilla.org/en-US/exp/firefox/">Latest</a></td>
         <td><pre>npm run cy:run-firefox</pre></td>
         <td>Developed by the Mozilla Foundation</td>
      </tr>
      <tr>
         <td><a href="https://www.mozilla.org/en-US/firefox/developer/">Firefox Developer</a></td>
         <td><pre>npm run cy:run-firefox:developer</pre></td>
         <td></td>
      </tr>
      <tr>
         <td><a href="https://www.mozilla.org/en-US/firefox/channel/desktop/#nightly">Firefox Nightly</a></td>
         <td><pre>npm run cy:run-firefox:nightly</pre></td>
         <td>A developmental channel for new Mozilla Firefox releases</td>
      </tr>
      <tr>
         <td><i style="color:blue" class="fab fa-internet-explorer"></i> Internet Explorer</td>
         <td><a href="https://www.microsoft.com/en-us/download/internet-explorer.aspx">Latest</a></td>
         <td>Not Supported</td>
         <td>Developed by Microsoft and included in the Microsoft Windows line of operating systems</td>
      </tr>
      <tr>
         <td><i style="color:blue" class="fab fa-safari"></i> Safari</td>
         <td><a href="https://www.apple.com/safari/">Latest</a></td>
         <td>Not Supported</td>
         <td>Developed by Apple, based on the WebKit engine</td>
      </tr>
   </tbody>
</table>

### FAQS

**Can I test multiple versions of a browser?**
No. Currently we do not support tests for previous versions of a browser.

**Where are my test folders?**
`/cypress.json` is our first folder.

**Where to find environment variables?**
Environment variables use `Cypress.env` for the current spec tests. You can check them in `/cypress.json` file.

**How can I get the latest version of Cypress?**

- Get the current version of Cypress: `npx cypress version`
- Update Cypress: Change to the latest version number of Cypress in package.json first, then `npm install cypress --save-dev`

**How do cy.login() and cy.bootstrapOrg1() work?**
In your `/cypress/support/commands.js` file, you can define or overwrite commands since it is loaded before any test files are evaluated via an import statement in your support file (`/cypress/support/index.js` by default). You can also see official documents [here](https://docs.cypress.io/api/commands/as.html#Fixture). Therefore, we defined the commands to login the application and initialize organizations first.

**How does the org1 in `/cypress/fixtures` work?**
Fixtures are used as external pieces of static data that can be used by your tests. In our example, `/cypress/fixtures/org1` is a fake organization whose contacts, users and addresses are also fake. By changing the information of org1 through json objects, we are able to set corresponding responses according to different requests to test the functionality.

**Where to find the report?**
When you run the command `npm run tests`, you can find the reports here:
`.\cypress\reports\CypressTestResults.html`

**How to push the scripts?**

- `git commit`
- `git rebase`
- `git push`
