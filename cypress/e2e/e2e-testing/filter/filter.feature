Feature: Validate the filter functionality
#
#    Background: User logs in with correct credentials
#        Given The user logged into the application
#        When The user browse all AAIS products
#
#    Scenario: The user filter an specific product
#        When The user selects the "YT" product
#        * The user adds the "MU" state
#        * The user selects the "Rules" material type
#        * The user types "water" in the searchbox
#        Then The user is able to see the results
    
    # Scenario: The user validates the date filter
    #     When The user selects the "YT" product
    #     * The user adds the "Multistate" state
    #     * The user selects the "Rules" material type
    #     * The user selects the "02/03/2021" date
    #     * The user types "water" in the searchbox
    #     Then The user is able to see the results

    # Scenario: The user set an specific date
    #     When The user selects the "YT" product
    #     * The user adds the "Multistate" state
    #     * The user selects the "Rules" material type
    #     * The user sets the "02/03/2022" date
    #     * The user types "water" in the searchbox
    #     Then The user is able to see the results

    # Scenario: The user executes all validations over the date picker
    #     When The user validates the date field name is effective date
    #     * The user validates the date field by default shows the date, month, year as per the system date
    #     * The user validates the calendar component is active when the date field is clicked
    #     Then The user validates that the date picker is closed correctly by clicking outside
