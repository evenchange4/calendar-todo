// @flow
import { graphql } from 'react-apollo';
import { gql } from 'graphql.macro';
import * as R from 'ramda';
import { GRAPHQL_TAG as QUERY_EVENTS } from './withEvents';
import { type HOC, type Proxy } from '../utils/type.flow';

/**
 * Type (additional props)
 */
export type Response = { data: { deleteEvent: string } };
export type DeleteEvent = (eventId: string) => Promise<Response>;
export type InjectedProps = { deleteEvent: DeleteEvent };

/**
 * GraphQL query
 */
export const GRAPHQL_TAG: Object = gql`
  mutation delete($eventId: ID!) {
    delete(eventId: $eventId)
  }
`;

/**
 * HOC
 */
const withDeleteEvent: HOC<*, InjectedProps> = (graphql: any)(GRAPHQL_TAG, {
  alias: 'deleteEvent',
  props: ({ mutate }): InjectedProps => ({
    deleteEvent: eventId =>
      mutate({
        variables: { eventId },
        update: (proxy: Proxy) => {
          const prevState = proxy.readQuery({ query: QUERY_EVENTS });
          const data = R.evolve({
            events: R.reject(R.propEq('id', eventId)),
          })(prevState);
          proxy.writeQuery({ query: QUERY_EVENTS, data });
        },
      }),
  }),
});

export default withDeleteEvent;
