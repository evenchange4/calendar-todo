// @flow
import { graphql } from 'react-apollo';
import { gql } from 'graphql.macro';
import * as R from 'ramda';
import { EventListFragment } from './fragments';
import { GRAPHQL_TAG as QUERY_EVENTS } from './withEvents';
import { type HOC, type Proxy, type Event } from '../utils/type.flow';

/**
 * Type (additional props)
 */
export type Response = { data: { insert: Event } };
export type InsertEvent = ({
  summary: string,
  description: string,
  location: string,
  start: string,
  end: string,
}) => Promise<Response>;
export type InjectedProps = { insertEvent: InsertEvent };

/**
 * GraphQL query
 */
export const GRAPHQL_TAG: Object = gql`
  mutation insert(
    $summary: String!
    $description: String
    $location: String!
    $start: String!
    $end: String!
  ) {
    insert(
      summary: $summary
      description: $description
      location: $location
      start: { dateTime: $start }
      end: { dateTime: $end }
    ) {
      ...EventListFragment
    }
  }
  ${EventListFragment}
`;

/**
 * HOC
 */
const withInsertEvent: HOC<*, InjectedProps> = (graphql: any)(GRAPHQL_TAG, {
  alias: 'insertEvent',
  props: ({ mutate }): InjectedProps => ({
    insertEvent: ({ summary, description, location, start, end }) =>
      mutate({
        variables: { summary, description, location, start, end },
        update: (proxy: Proxy, { data: { insert } }: Response) => {
          const prevState = proxy.readQuery({ query: QUERY_EVENTS });
          const data = R.evolve({
            events: R.append(insert),
          })(prevState);
          proxy.writeQuery({ query: QUERY_EVENTS, data });
        },
      }),
  }),
});

export default withInsertEvent;
