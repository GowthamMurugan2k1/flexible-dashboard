export interface TableRowDataBase {
  id: number;
  tax_year: string;
  company: string;
  state: string;
  assessor: string;
  account: string;
  appealed_del: string;
}

export interface CalendarType {
  start: Date | string;
  end: Date | string;
  title: string;
  type: "Event" | "Reminder";
}

export type calenderDate = {
  start: Date | undefined | string;
  end: Date | undefined | string;
};
