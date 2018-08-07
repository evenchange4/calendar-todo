// @flow
import * as React from 'react';
import { mount } from '@pisano/enzyme';
import toJson from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import EventForm from '../EventForm';

it('should render EventForm', async () => {
  const mocks = [];

  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <EventForm open={false} onHide={() => {}} />
    </MockedProvider>,
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});
