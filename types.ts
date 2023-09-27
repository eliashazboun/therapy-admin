export interface EventObject {
  id: string; // A unique identifier of an event. Useful for getEventById.
  groupId?: string; // Events that share a groupId will be dragged and resized together automatically.
  allDay?: boolean; // Determines if the event is shown in the "all-day" section of relevant views.
  start: Date | null; // Date object that obeys the current timeZone. When an event begins.
  end?: Date | null; // Date object that obeys the current timeZone. When an event ends. It could be null if an end wasn't specified.
  startStr?: string; // An ISO8601 string representation of the start date.
  endStr?: string; // An ISO8601 string representation of the end date.
  title: string; // The text that will appear on an event.
  url?: string; // A URL that will be visited when this event is clicked by the user.
  classNames?: string[]; // An array of strings determining HTML classNames attached to the rendered event.
  editable?: boolean | null; // Value overriding the editable setting for this specific event.
  startEditable?: boolean | null; // Value overriding the eventStartEditable setting for this specific event.
  durationEditable?: boolean | null; // Value overriding the eventDurationEditable setting for this specific event.
  resourceEditable?: boolean | null; // Value overriding the eventResourceEditable setting for this specific event.
  display?: 'auto' | 'block' | 'list-item' | 'background' | 'inverse-background' | 'none'; // The rendering type of this event.
  overlap?: boolean; // Value overriding the eventOverlap setting for this specific event.
  constraint?: any; // The eventConstraint override for this specific event.
  backgroundColor?: string; // The eventBackgroundColor override for this specific event.
  borderColor?: string; // The eventBorderColor override for this specific event.
  textColor?: string; // The eventTextColor override for this specific event.
  extendedProps?: Record<string, any>; // A plain object holding miscellaneous other properties.
  source?: any; // A reference to the Event Source this event came from.
}

export interface DateInfoObject {
  date: Date; // A Date for the clicked day/time.
  dateStr: string; // An ISO8601 string representation of the date.
  allDay: boolean; // true or false whether the click happened on an all-day cell.
  dayEl: HTMLElement; // An HTML element that represents the whole-day that was clicked on.
  jsEvent: MouseEvent; // The native JavaScript event with low-level information such as click coordinates.
  view: any; // The current View Object. You can replace 'any' with a specific type if known.
  resource?: any; // If the current view is a resource-view, the Resource Object that owns this date.
}

export type Person = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

