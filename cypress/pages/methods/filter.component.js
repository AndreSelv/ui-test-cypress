import { FILTER_SELECTORS } from "../selectors/filter.selectors";

export class FilterComponent {
  getBrowseProductComboBox() {
    return FILTER_SELECTORS.browseProductComboBox;
  }
  getBrowseProductOptions() {
    return FILTER_SELECTORS.browseProductOptions;
  }
  getAddState() {
    return FILTER_SELECTORS.addState;
  }
  getAddStateOptions() {
    return FILTER_SELECTORS.addStateOptions;
  }
  getMaterialTypeComboBox() {
    return FILTER_SELECTORS.materialTypeComboBox;
  }
  getMaterialTypeOptions() {
    return FILTER_SELECTORS.materialTypeOptions;
  }
  getStatusComboBox() {
    return FILTER_SELECTORS.statusComboBox;
  }
  getStatusOptions() {
    return FILTER_SELECTORS.statusOptions;
  }
  getDateInputLabel() {
    return FILTER_SELECTORS.dateInputLabel;
  }
  getDateInput() {
    return FILTER_SELECTORS.dateInput;
  }
  getCalendarIcon() {
    return FILTER_SELECTORS.calendarIcon;
  }
  getCalendar() {
    return FILTER_SELECTORS.calendar;
  }
  getCalendarTop() {
    return FILTER_SELECTORS.calendarTop;
  }
  getCurrentDate() {
    return FILTER_SELECTORS.currentDate;
  }
  getYearSelectorArrow() {
    return FILTER_SELECTORS.yearSelectorArrow;
  }
  getPreviousMonthArrow() {
    return FILTER_SELECTORS.previousMonthArrow;
  }
  getNextMonthArrow() {
    return FILTER_SELECTORS.nextMonthArrow;
  }
  getYearContent() {
    return FILTER_SELECTORS.yearContent;
  }
  getCalendarContent() {
    return FILTER_SELECTORS.calendarContent;
  }
  getSearchInput() {
    return FILTER_SELECTORS.searchInput;
  }
}
