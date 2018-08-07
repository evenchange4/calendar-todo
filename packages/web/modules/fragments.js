// @flow
import { gql } from 'graphql.macro';

export const EventDetailFragment: Object = gql`
  fragment EventDetailFragment on Event {
    id
    summary
    location
    htmlLink
    description
    start {
      dateTime
    }
    end {
      dateTime
    }
  }
`;

export const EventListFragment: Object = gql`
  fragment EventListFragment on Event {
    id
    summary
    location
  }
`;
