export  interface CalendarEvent {
  typeName: string;
  emoji: string;
  from: Date;
  to: Date;
  title: string;
  text: string[];
  urgent: boolean;
}

export interface WeekElement {
  days: DayElement[];
  active: boolean;
}

export interface DayElement {
  active: boolean;
  date: Date;
  events: CalendarEvent[];
}
