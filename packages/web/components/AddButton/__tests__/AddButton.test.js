// @flow
import * as React from 'react';
import { shallow } from '@pisano/enzyme';
import toJson from 'enzyme-to-json';
import AddButton from '../AddButton';

it('should render AddButton', async () => {
  const wrapper = shallow(<AddButton />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
