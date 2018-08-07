// @flow
import { graphql, type OptionProps } from 'react-apollo';
import { gql } from 'graphql.macro';
// import { SceneTypeFragment } from './fragments';
import { type HOC, type Events } from '../utils/type.flow';

/**
 * Type (additional props)
 */
export type Response = OptionProps<*, { events: Events }, {}>;
export type InjectedProps = {
  events: { events: Events, loading: boolean, error: ?Object },
};

/**
 * GraphQL query
 */
export const GRAPHQL_TAG: Object = gql`
  query events {
    events {
      id
      summary
      location
    }
  }
`;

/**
 * HOC
 */
const withEvents: HOC<*, InjectedProps> = (graphql: any)(GRAPHQL_TAG, {
  alias: 'events',
  props: ({ data: { events, loading, error } }: Response): InjectedProps => ({
    events: { events, loading, error },
  }),
});

export default withEvents;
