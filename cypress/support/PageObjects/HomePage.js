class HomePage {

  getBrowseAllAAISProductsLink() {
    return cy.contains("Browse All AAIS Products");
  }

  getNavBarMenu() {
    return cy.get("[data-test=\"navBarAvatar\"]");
  }

  selectAvatarOptions(option = "My Settings") {
    this.getNavBarMenu().trigger("mouseover");
    cy.contains(option).click({ force: true });
  }

  getFooterContactLink() {
    return cy.contains("Contact");
  }

  getFooterLegalLink() {
    return cy.contains("Legal");
  }

  getFooterAAISOnlineLink() {
    return cy.contains("AAISonline");
  }

  getAAISLogo() {
    return cy.get("#header");
  }

  getNavBarSearch() {
    return cy.get("[data-test=navBarSearch]");
  }

  getMyRecentProductsSection() {
    return cy.contains("My Recent Products");
  }

  getWildLifeRecourseCenter() {
    return cy.contains("Wildfire Resource Center");
  }

  getSearchBar() {
    return cy.get("[data-test=navBarSearch]");
  }

  getStatisticalReporting() {
    return cy.contains("Statistical Reporting (BETA)");
  }

  typeSearchBar(text) {
    this.getSearchBar().type(`${text}{enter}`);
  }

  getBrowseWidgets(){
    return cy.get('[data-rbd-draggable-id="browse"]')
  }

   getNewlyAvailableWidgets(){
    return cy.get('[data-rbd-draggable-id="newly"]')
  }

   getRecentDownloadWidgets(){
    return cy.get('[data-rbd-draggable-id="recentProducts"]')
  }

}

export default HomePage;