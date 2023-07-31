/**
 * @description The enumeration of the Lines
 * @since 1.0.0
 * @enum {String}
 * @readonly
 * @public
 */

const LINES = [
  {
    key: "AGXL",
    title: "Agricultural Commercial Excess & Umbrella Liability",
    description:
      "This program, available for use by any insurer, includes three base forms (two umbrella and one excess) and nearly 140 multistate endorsements for tailoring excess and/or umbrella coverage for the needs of a particular risk.",
    certificationStatus: "CERTIFIED",
  },
  {
    key: "AGGL",
    title: "Agricultural General Liability",
    description:
      "This program provides forms, rules, and rating information for writing monoline liability coverage for agricultural operations, including farming, processing, sales, storage, and distribution operations. Coverage can also be added for personal liability exposures. The forms may be packaged with property terms filed under the AAIS Agricultural Output Program or other industry programs.",
    certificationStatus: "CERTIFYING",
  },
  {
    key: "AGOP",
    title: "Agricultural Output Program",
    description:
      "This program provides forms, rules, and rating information for writing monoline property coverage for agricultural-related buildings, builder's risk property, computers, mobile equipment, personal property, stock, and income coverages. The forms may be packaged with liability terms filed under the AAIS Agricultural General Liability Program or other industry programs.",
    certificationStatus: "CERTIFIED",
  },
  {
    key: "AP",
    title: "Artisans",
    description:
      "The Artisans Program provides a ready-made package of coverages for an artisan contractor account, which can be insured for property and liability or for liability only. Whether they are sole tradesmen or firms with up to 10 employees, artisan contractor operations with an annual maximum of $3 million in sales and $500,000 in payroll are eligible.",
    certificationStatus: "NOT_CERTIFIED",
  },
  {
    key: "BT",
    title: "Boatowners",
    description:
      "Boats up to 30 feet in length are eligible under the Boatowners program. The Boatowners program provides coverage for property (hull) and liability (protection & indemnity) exposures. The Boatowners program is a filed program.",
    certificationStatus: "NOT_CERTIFIED",
  },
  {
    key: "BOP",
    title: "Businessowners",
    description:
      "The Businessowners Program provides the traditional choice between a named perils Standard form and an open perils Special form for insuring small businesses, offices, apartment buildings, warehouses, wholesalers, restaurants, and other operations. This program includes an innovative mechanism for rating off-premises liability exposures.",
    certificationStatus: "CERTIFYING",
  },
  {
    key: "CAB",
    title: "Cannabis Businessowners",
    description:
      "The Cannabis Businessowners (CannaBOP) program includes forms, rules and rating information for qualifying cannabis dispensaries, storage facilities, distributors, processors, manufacturers and other businesses participating in or supporting the cannabis industry. Like most standard businessowners programs, the CannaBOP program provides a package policy containing both property and liability coverages",
    certificationStatus: "NOT_CERTIFIED",
  },
  {
    key: "CA",
    title: "Commerical Auto",
    description: "",
    certificationStatus: "NOT_CERTIFIED",
  },
  {
    key: "CPP",
    title: "Combination Policy Program",
    description:
      "The Combination Policy Program (manual only) provides concise rules and premium modification factors for packaging two or more monoline coverage parts. This program provides package modifiers that apply to both property and liability coverages, and includes individual risk premium modification (IRPM) factors.",
    certificationStatus: "NOT_CERTIFIED",
  },
  {
    key: "CR",
    title: "Commercial Crime",
    description:
      "The Commercial Crime Program includes several coverage parts that can be packaged together or written separately.",
    certificationStatus: "CERTIFYING",
  },
  {
    key: "CIM",
    title: "Commercial Inland Marine (Filed)",
    description:
      "The Commercial Inland Marine Program (for filed classes) gives insurers a comprehensive collection of commercial inland marine products that can be packaged with other AAIS or non-AAIS forms, or written as stand-alone policies. The format and language of these forms are consistent with those found in the Inland Marine Guide. Like the Guide forms, the filed commercial inland marine forms have common inland marine conditions built in, eliminating the need for bridge endorsements.",
    certificationStatus: "NOT_CERTIFIED",
  },
  {
    key: "CL",
    title: "Commercial Liability (w/ CLT)",
    description:
      "The Commercial Liability Program features five basic forms: commercial liability, broad form commercial liability, owners and contractors protective, premises only, and farm premises and operations. This program features inflation-sensitive rating bases for many classifications.",
    certificationStatus: "NOT_CERTIFIED",
  },
  {
    key: "CLT",
    title: "Commercial Liability (Traditional)",
    description:
      "The Commercial Liability Program (Traditional) features five basic forms: commercial liability, broad form commercial liability, owners and contractors protective, premises only, and farm premises and operations. This program features fixed rating bases which are not inflation-sensitive for many classifications.",
    certificationStatus: "NOT_CERTIFIED",
    notVisible: true,
  },
  {
    key: "COP",
    title: "Commercial Output Program",
    description:
      "The Commercial Output Program (COP) is a specialty program that combines commercial property (buildings, contents) and inland marine coverages. Eligible operations include manufacturing, institutional, and commercial risks (see state exceptions). The COP utilizes deficiency point rating steps to individually rate accounts. The COP is intended to be used to write large to medium size risks and/or multiple location accounts. The COP has been filed and approved in all 50 states.",
    certificationStatus: "NOT_CERTIFIED",
  },
  /*{
    key: "CXL",
    title: "Commercial Output Program XL",
    description:
      "The Commercial Output Program - XL (COP-XL) is an expanded version of the COP. It is a specialty program designed for the largest commercial accounts. COP-XL combines commercial property (buildings, contents) coverages and inland marine coverages. Eligible operations include large size and/or multiple location manufacturing, institutional, industrial, and commercial risks (see state exceptions). The COP-XL utilizes deficiency point rating steps to individually rate accounts.",
    certificationStatus: "NOT_CERTIFIED",
    notVisible: true,
  },*/
  {
    key: "CP",
    title: "Commercial Properties",
    description:
      "The Commercial Properties Program provides standard industry coverages in a simplified policy structure. Class rating is offered for a variety of risks, along with detailed manual rules with explicit rating instructions.",
    certificationStatus: "NOT_CERTIFIED",
  },
  {
    key: "CUP",
    title: "Commercial Umbrella",
    description:
      "The Commercial Umbrella Liability Program, revised in 2011, makes available a Commercial Excess/Umbrella Liability Coverage form and a Commercial Umbrella Liability Coverage form, as well as related endorsements, to provide both excess and primary coverage to minimize the possibility of coverage gaps or unintended exposures.",
    certificationStatus: "NOT_CERTIFIED",
  },
  /*{
    key: "DOP",
    title: "Developers Output Program",
    description:
      "The Developers Output Program (DOP) adapts output coverage and rating to the unique needs of building contractors by integrating builders risk, mobile equipment, and other construction-related inland marine coverages with commercial property coverage in a single policy form.",
    certificationStatus: "NOT_CERTIFIED",
    notVisible: true,
  },*/
  {
    key: "DP",
    title: "Dwelling Properties",
    description:
      "This program provides forms, rules, and rating information for writing monoline property coverage for owner-occupied, tenant-occupied, or vacant one-to-four family dwellings and mobile homes intended for private residential purposes. Liability terms covering the owner/landlord of a one-to-four family dwelling are an available option, or the forms may be packaged with liability terms filed under the AAIS Personal and Premises Liability Program or other industry programs.",
    certificationStatus: "NOT_CERTIFIED",
  },
  {
    key: "FIM",
    title: "Farm Inland Marine",
    description:
      "The Farm Inland Marine (FIM) program provides standardized forms and state rating information for insuring unique farm and agricultural exposures.",
    certificationStatus: "CERTIFYING",
  },
  {
    key: "FP",
    title: "Farm Properties",
    description:
      "This program provides forms, rules, and rating information for writing monoline property coverage for owner-occupied, tenant-occupied, or vacant one- to four-family dwellings and mobile homes located on farms; farm outbuildings; and farm personal property. The forms may be packaged with liability terms filed under the AAIS Personal and Premises Liability Program or other industry programs.",
    certificationStatus: "NOT_CERTIFIED",
  },
  {
    key: "FUP",
    title: "Farm Umbrella",
    description:
      "This program provides both farm personal umbrella and farm commercial umbrella terms that coincide with the liability coverage options available under the AAIS Farmowners Program.",
    certificationStatus: "NOT_CERTIFIED",
  },
  {
    key: "FO",
    title: "Farmowners",
    description:
      "This program provides forms, rules, and rating information for writing package property and liability coverage for one- to four-family farm dwellings, farm outbuildings, and farm personal property. The program includes both a farm personal liability coverage part and a farm commercial liability coverage part.",
    certificationStatus: "NOT_CERTIFIED",
  },
  {
    key: "GS",
    title: "Glass",
    description:
      "The Glass Program provides a simplified rating plan based on square feet. An experience rating plan, as well as individual risk premium modifications are available.",
    certificationStatus: "NOT_CERTIFIED",
  },
  /*{
    key: "HBB",
    title: "Home-Based Business",
    description:
      "This program provides a coverage part, rules, and rating information for writing the property and liability exposures of a small business that is conducted in the residence or a related private structure covered by a Homeowners, Mobile-Homeowners, or Farmowners policy written with AAIS forms. Eligible classifications include the following operations: Office, Service, Retail, Crafts, Food, and Bed and Breakfast.",
    certificationStatus: "NOT_CERTIFIED",
    notVisible: true,
  },*/
  /*{
    key: "HOA",
    title: "Homeowners (Alternate)",
    description:
      "This program provides forms, rules, and rating information for writing property and liability coverage for the owner-occupant of a one-to-four family dwelling or condominium or co-operative unit used for private residential purposes. Coverage can also be provided for the tenant of a dwelling or an apartment used for those purposes. The property coverage provided by the forms in this program is more limited than that provided by the forms in the standard Homeowners Program. AAIS presently maintains this program in compliance for the states of Indiana and Pennsylvania only.",
    certificationStatus: "NOT_CERTIFIED",
    notVisible: true,
  },*/
  {
    key: "HO",
    title: "Homeowners",
    description:
      "This program provides forms, rules, and rating information for writing property and liability coverage for the owner-occupant of a one-to-four family dwelling or condominium or co-operative unit used for private residential purposes. Coverage can also be provided for the tenant of a dwelling or an apartment used for private residential purposes.",
    certificationStatus: "NOT_CERTIFIED",
  },
  /*{
    key: "HOBP",
    title: "Homeowners By-Peril Rating",
    description: "Homeowners By-Peril Rating",
    certificationStatus: "NOT_CERTIFIED",
  },*/
  {
    key: "IMG",
    title: "Inland Marine Guide (Nonfiled)",
    description:
      "The Inland Marine Guide is AAIS's program for the traditional commercial nonfiled inland marine classes. The Guide consists of forms, rating procedures, coverage commentary, underwriting guidelines, and general information for the Inland Marine Guide classes. Although the Guide addresses the nonfiled classes, forms and rates have been filed in states that require filings.",
    certificationStatus: "NOT_CERTIFIED",
    classes: {
      BCF: {
        key: "BCF",
        title: "Bailee Customers Floater - Dry Cleaners",
      },
      BR: {
        key: "BR",
        title: "Builders' Risk",
      },
      BRC: {
        key: "BRC",
        title: "Builders' Risk - Civil Works",
      },
      CC: {
        key: "CC",
        title: "Contractors' Combination",
      },
      CE: {
        key: "CE",
        title: "Contractors' Equipment",
      },
      DIC: {
        key: "DIC",
        title: "Difference in Conditions",
      },
      EDP: {
        key: "EDP",
        title: "Electronic Data Processing",
      },
      EDB: {
        key: "EDB",
        title: "Electronic Data Processing - Business Computer",
      },
      EDC: {
        key: "EDC",
        title: "Electronic Data Processing - Computer",
      },
      EDD: {
        key: "EDD",
        title: "Electronic Data Processing - Data Compromise",
      },
      ESR: {
        key: "ESR",
        title: "Equipment Sales And Rental",
      },
      FAD: {
        key: "FAD",
        title: "Fine Art Dealers",
      },
      ART: {
        key: "ART",
        title: "Fine Arts Floater",
      },
      GE: {
        key: "GE",
        title: "General Endorsements",
      },
      IF: {
        key: "IF",
        title: "Installation Floater",
      },
      FLT: {
        key: "FLT",
        title: "Miscellaneous Floaters",
      },
      MIS: {
        key: "MIS",
        title: "Miscellaneous Forms",
      },

      MTC: {
        key: "MTC",
        title: "Motor Truck Cargo",
      },
      MUS: {
        key: "MUS",
        title: "Museums",
      },
      RAD: {
        key: "RAD",
        title: "Radio and Television Towers and Equipment",
      },
      REN: {
        key: "REN",
        title: "Renewable Energy Generating Equipment",
      },
      RIG: {
        key: "RIG",
        title: "Riggers' Coverage",
      },
      TRA: {
        key: "TRA",
        title: "Transit",
      },
      WLL: {
        key: "WLL",
        title: "Warehouse Legal Liability",
      },
    },
  },
  {
    key: "MHO",
    title: "Mobile Homeowners",
    description:
      "This program provides forms, rules, and rating information for writing property and liability coverage for the owner-occupant or tenant of a mobile home used for private residential purposes. The property coverage provided by the forms in this program is more limited than that provided by the forms in the standard Mobile Homeowners Program. AAIS presently maintains this program in compliance for the states of Indiana, Pennsylvania, and North Carolina only.",
    certificationStatus: "NOT_CERTIFIED",
  },
  {
    key: "PPL",
    title: "Personal & Premises Liability",
    description:
      "This program provides forms, rules, and rating information for writing monoline liability coverage. Eligible risks include personal liability coverage for a person maintaining a residence in a one-to-four family dwelling, farm personal liability coverage for a person maintaining a residence in a one-to-four family dwelling and buildings or land used for farming, and commercial premises-only liability coverage for a person or an organization owning or leasing a one-to-four family dwelling. The forms may be packaged with property terms filed under the AAIS Dwelling Properties or Farm Properties programs or other industry programs.",
    certificationStatus: "NOT_CERTIFIED",
  },
  {
    key: "PA",
    title: "Personal Auto",
    description:
      "This program provides forms and rules for writing personal automobile policies, including liability coverages, physical damage coverages, and other mandatory and optional coverages, for individuals who own and operate an eligible vehicle. Coverage can also be provided for individuals who operate certain non-owned vehicles.",
    certificationStatus: "NOT_CERTIFIED",
  },
  {
    key: "PC",
    title: "Personal Auto Non-Standard",
    description:
      "This program provides forms and rules for writing non-standard personal automobile policies, including liability coverages, physical damage coverages, and other mandatory and optional coverages, for individuals who own and operate an eligible vehicle. Coverage can also be provided for individuals who operate certain non-owned vehicles.",
    certificationStatus: "NOT_CERTIFIED",
  },
  {
    key: "PIM",
    title: "Personal Inland Marine",
    description:
      "The Personal Inland Marine (PIM) program includes a wide range of personal 'floaters' that allow carriers to write specific insurance for valuable personal property. PIM coverage typically insures items that have limited coverage under policies such as homeowners or tenants.",
    certificationStatus: "NOT_CERTIFIED",
  },
  {
    key: "PUP",
    title: "Personal Umbrella",
    description:
      "This program provides forms and sample rules and rating information for writing excess liability coverage over the limits of underlying policies, plus 'drop down' coverage for personal injury liability. The forms are designed to be written in conjunction with underlying personal liability insurance provided by a Homeowners or Mobile-Homeowners policy written with AAIS forms. Coverage can be written as an attachment to the Homeowners or Mobile-Homeowners policy or as a separate policy.",
    certificationStatus: "NOT_CERTIFIED",
  },
  {
    key: "YT",
    title: "Yacht",
    description:
      "Yachts 26 feet or longer are eligible under the Yacht program. The Yacht program provides coverage for property (hull) and liability (protection & indemnity) exposures.",
    certificationStatus: "CERTIFYING",
  }
]

export default LINES;
