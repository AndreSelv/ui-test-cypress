class HomePage {

  getBrowseAllAAISProductsLink() {
    return cy.contains("Browse All AAIS Products");
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