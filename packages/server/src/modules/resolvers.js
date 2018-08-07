// @flow
import { CALENDAR_ID } from '../utils/configs';
import {
  type Context,
  type InsertPayload,
  type UpdatePayload,
} from '../utils/type.flow';

const resolvers = {
  Query: {
    events: async (obj: any, args: any, { calendar }: Context) => {
      const res = await calendar.events.list({
        calendarId: CALENDAR_ID,
      });
      return res.data.items;
    },
    event: async (
      obj: any,
      { eventId }: { eventId: string },
      { calendar }: Context,
    ) => {
      const res = await calendar.events.get({
        calendarId: CALENDAR_ID,
        eventId,
      });
      return res.data;
    },
  },
  Mutation: {
    insert: async (obj: any, event: InsertPayload, { calendar }: Context) => {
      const res = await calendar.events.insert({
        calendarId: CALENDAR_ID,
        resource: event,
      });
      return res.data;
    },
    update: async (
      obj: any,
      { eventId, ...event }: UpdatePayload,
      { calendar }: Context,
    ) => {
      const res = await calendar.events.update({
        calendarId: CALENDAR_ID,
        eventId,
        resource: event,
      });
      return res.data;
    },
    delete: async (
      obj: any,
      { eventId }: { eventId: string },
      { calendar }: Context,
    ) => {
      const res = await calendar.events.delete({
        calendarId: CALENDAR_ID,
        eventId,
      });
      return res.data;
    },
  },
};

export default resolvers;
