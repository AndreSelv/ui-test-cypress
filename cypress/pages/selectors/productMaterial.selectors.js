const productMaterial = 'body [role="dialog"]';
const dateCalendar = `${productMaterial} .MuiCalendarPicker-root`;

export const PRODUCT_MATERIAL_SELECTORS = {
  notWhatYouWereLookingFor:
    '[data-test="browseScreen-item-product-request-button"]',
  productMaterialPopUp: `${productMaterial}`,
  popUpTitle: `${productMaterial} .MuiCardHeader-content span`,
  popUpClose: '[data-test="clear"]',
  popUpSearchTerms: '[data-test="request-modal-searched-terms"] input',
  popUpWCWDFY: '[data-test="request-modal-additional-info"] textarea',
  dateInputLabel: `${productMaterial} .MuiCardContent-root .MuiGrid-container > div:nth-child(6) label`,
  dateInput: `${productMaterial} .MuiCardContent-root .MuiGrid-container > div:nth-child(6) input`,
  calendarIcon: `${productMaterial} [data-testid="CalendarIcon"]`,
  calendar: `${dateCalendar}`,
  calendarTop: `${dateCalendar} > div:nth-child(1)`,
  currentDate: `${dateCalendar} > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div`,
  yearSelectorArrow: `${dateCalendar} > div:nth-child(1) > div:nth-child(1) .MuiButtonBase-root`,
  previousMonthArrow: "[data-testid='ArrowLeftIcon']",
  nextMonthArrow: "[data-testid='ArrowRightIcon']",
  yearContent: `${productMaterial} .MuiYearPicker-root`,
  calendarContent: `${dateCalendar} [role="grid"]`,
  popUpSubmit: '[data-test="submit-modal-request"]',
  confirmationMessage: '[id="alert-dialog-description"]',
  keepBrowsingButton: '[data-test="keep-browsing-products"]',
};
