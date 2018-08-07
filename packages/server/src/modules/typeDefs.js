// @flow
import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Time {
    dateTime: String
    timeZone: String
  }

  type Event {
    kind: String
    etag: String
    status: String
    htmlLink: String
    id: ID
    summary: String
    description: String
    location: String
    start: Time
    end: Time
  }

  type Query {
    events: [Event]!
    event(eventId: ID): Event
  }

  input TimePayload {
    dateTime: String
    timeZone: String
  }
  type Mutation {
    insert(
      summary: String
      description: String
      location: String
      start: TimePayload
      end: TimePayload
    ): Event
    update(
      eventId: ID
      summary: String
      description: String
      location: String
      start: TimePayload
      end: TimePayload
    ): Event
    delete(eventId: ID): ID
  }
`;

export default typeDefs;
