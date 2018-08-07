// @flow
export type Tokens = {
  access_token: string,
  token_type: string,
  refresh_token: string,
  scope: string,
  expiry_date: number,
};
export type Time = {
  dateTime: string,
  timeZone: string,
};
export type Event = {
  kind: string,
  etag: string,
  status: string,
  htmlLink: string,
  id: string,
  summary: string,
  description: string,
  location: string,
  start: Time,
  end: Time,
};
export type CalendarId = string;
export type InsertPayload = {
  summary: string,
  description: string,
  location: string,
  start: Time,
  end: Time,
};
export type UpdatePayload = {
  eventId: string,
  summary: string,
  description: string,
  location: string,
  start: Time,
  end: Time,
};
export type Context = {
  calendar: {
    events: {
      list: ({ calendarId: CalendarId }) => Promise<{
        data: { items: Array<Event> },
      }>,
      get: ({ calendarId: CalendarId, eventId: string }) => Promise<{
        data: Event,
      }>,
      insert: ({ calendarId: CalendarId, resource: InsertPayload }) => Promise<{
        data: Event,
      }>,
      update: ({
        calendarId: CalendarId,
        eventId: string,
        resource: InsertPayload,
      }) => Promise<{
        data: Event,
      }>,
      delete: ({ calendarId: CalendarId, eventId: string }) => Promise<{
        data: string,
      }>,
    },
  },
};
