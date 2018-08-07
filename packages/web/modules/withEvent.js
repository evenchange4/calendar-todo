// @flow
import { graphql, type OptionProps } from 'react-apollo';
import { gql } from 'graphql.macro';
import { EventDetailFragment } from './fragments';
import { type HOC, type Event } from '../utils/type.flow';

/**
 * Type (additional props)
 */
export type Response = OptionProps<*, { event: Event }, {}>;
export type InjectedProps = {
  event: { event: Event, loading: boolean, error: ?Object },
};

/**
 * GraphQL query
 */
export const GRAPHQL_TAG: Object = gql`
  query event($eventId: ID) {
    event(eventId: $eventId) {
      ...EventDetailFragment
    }
  }
  ${EventDetailFragment}
`;

/**
 * HOC
 */
const withEvent: HOC<*, InjectedProps> = (graphql: any)(GRAPHQL_TAG, {
  alias: 'event',
  options: ({ eventId }) => ({
    variables: {
      eventId,
    },
  }),
  props: ({ data: { event, loading, error } }: Response): InjectedProps => ({
    event: { event, loading, error },
  }),
});

export default withEvent;
