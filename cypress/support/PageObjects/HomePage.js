class HomePage {

  getBrowseAllAAISProductsLink() {
    return cy.contains("Browse All AAIS Products");
  }

  getNavBarMenu(){
    return cy.get(`[data-test=navBarMenu]`)
  }

  getFooterContactLink(){
    return cy.contains("Contact")
  }

  getFooterLegalLink(){
    return cy.contains("Legal")
  }
  getFooterAAISOnlineLink(){
    return cy.contains("AAISonline")
  }

  getAAISLogo(){
    return cy.get("[data-test=AAISlogo]")
  }

  getNavBarSearch(){
    return cy.get("[data-test=navBarSearch]")
  }

  getMyRecentProductsSection() {
    return cy.contains("My Recent Products");
  }

  getWildLifeRecourseCenter(){
    return cy.contains("Wildfire Resource Center")
  }

  getSearchBar(){
    return cy.get("[data-test=navBarSearch]")
  }

  getStatisticalReporting(){
    return cy.contains("Statistical Reporting (BETA)")
  }

  typeSearchBar(text){
    this.getSearchBar().type(`${text}{enter}`)
  }

}

export default HomePage;