import React from 'react';
import { shallow } from 'enzyme';

import { NavBar } from './Navbar';

describe('<NavBar />', () => {
  it('should render without crashing', () => {
    const props = {
      dispatch: jest.fn(),
    };
    const wrapper = shallow(<NavBar {...props} />)
  });
});
