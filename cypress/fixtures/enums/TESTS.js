/**
 * @description The enumeration of the Lines
 * @since 1.0.0
 * @enum {String}
 * @readonly
 * @public
 */

const TESTS = [
  // {
  //   case: "GL-108 1.0",
  //   caseQuotes: "\"GL-108 1.0\"",
  //   result: 1,
  //   expect: "GL-108 1.0",
  // },
  {
    case: "BP 351",
    caseQuotes: "\"BP 351\"",
    result: 4,
    expect: "351",
  },
  {
    case: "BP351",
    caseQuotes: "\"BP351\"",
    result: 4,
    expect: "351",
  },
  {
    case: "UM 0811",
    caseQuotes: "\"UM 0811\"",
    result: 4,
    expect: "UM 0811",
  },
  {
    case: "UM0811",
    caseQuotes: "\"UM0811\"",
    result: 4,
    expect: "UM 0811",
  },
  {
    case: "CL 0136",
    caseQuotes: "\"CL 0136\"",
    result: 1,
    expect: "CL 0136",
  },
  {
    case: "CL0136",
    caseQuotes: "\"CL0136\"",
    result: 1,
    expect: "CL 0136",
  },
  // {
  //   case: "AG 0130 06 05",
  //   caseQuotes: "\"AG 0130 06 05\"",
  //   result: 1,
  //   expect: "AG 0130 06 05",
  // },
  {
    case: "BP-351",
    caseQuotes: "\"BP-351\"",
    result: 4,
    expect: "351",
  },

  {
    case: "23-0641",
    caseQuotes: "\"23-0641\"",
    result: 1,
    expect: "23-0641",
  },
  {
    case: "0641",
    caseQuotes: "\"0641\"",
    result: 20,
    expect: "0641",
  }
];

export default TESTS;
