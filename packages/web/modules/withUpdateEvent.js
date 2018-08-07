// @flow
import { graphql } from 'react-apollo';
import { gql } from 'graphql.macro';
import { EventDetailFragment } from './fragments';
import { type HOC, type Event } from '../utils/type.flow';

/**
 * Type (additional props)
 */
export type Response = { data: { update: Event } };
export type UpdateEvent = ({
  eventId: string,
  summary: string,
  description: string,
  location: string,
  start: string,
  end: string,
}) => Promise<Response>;
export type InjectedProps = { updateEvent: UpdateEvent };

/**
 * GraphQL query
 */
export const GRAPHQL_TAG: Object = gql`
  mutation update(
    $eventId: ID!
    $summary: String!
    $description: String
    $location: String!
    $start: String!
    $end: String!
  ) {
    update(
      eventId: $eventId
      summary: $summary
      description: $description
      location: $location
      start: { dateTime: $start }
      end: { dateTime: $end }
    ) {
      ...EventDetailFragment
    }
  }
  ${EventDetailFragment}
`;

/**
 * HOC
 */
const withUpdateEvent: HOC<*, InjectedProps> = (graphql: any)(GRAPHQL_TAG, {
  alias: 'updateEvent',
  props: ({ mutate }): InjectedProps => ({
    updateEvent: ({ eventId, summary, description, location, start, end }) =>
      mutate({
        variables: {
          eventId,
          summary,
          description,
          location,
          start: new Date(start),
          end: new Date(end),
        },
      }),
  }),
});

export default withUpdateEvent;
