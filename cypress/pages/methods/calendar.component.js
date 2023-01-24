import { FilterComponent } from "./filter.component";

const filter = new FilterComponent();

export class Calendar {
  monthsDiff(date, currentDate) {
    var desiredDate = new Date(date);
    var current = new Date(currentDate);
    var years = this.yearsDiff(desiredDate, current);
    var monthsDifference =
      years * 12 + (desiredDate.getMonth() - current.getMonth());
    return monthsDifference;
  }

  yearsDiff(date, currentDate) {
    var desiredDate = new Date(date);
    var current = new Date(currentDate);
    var yearsDifference = desiredDate.getFullYear() - current.getFullYear();
    return yearsDifference;
  }

  async selectDate(date) {
    var month = "";
    var year = "";
    var desiredDate = new Date(date);
    const months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];

    const m = await cy
      .get(filter.getCurrentDate())
      .invoke("text")
      .then((txt) => txt)
      .promisify();
    month = m;
    month = month.toLocaleLowerCase().split(" ")[0];
    month = months.indexOf(month) + 1;

    const y = await cy
      .get(filter.getCurrentDate())
      .invoke("text")
      .then((txt) => txt)
      .promisify();
    year = y.split(" ")[1];
    year = Number.parseInt(year);

    const currentDate = new Date(year, month - 1, 1);
    const diffMonths = this.monthsDiff(date, currentDate);
    var navigationButton;

    if (diffMonths > 0) {
      navigationButton = filter.getNextMonthArrow();
    } else {
      navigationButton = filter.getPreviousMonthArrow();
    }

    for (var i = 0; i < Math.abs(diffMonths); i += 1) {
      cy.get(navigationButton).click();
    }

    cy.get(filter.getCalendarContent()).contains(desiredDate.getDate()).click();
  }
}
