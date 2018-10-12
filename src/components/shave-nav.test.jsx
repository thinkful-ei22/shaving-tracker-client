import React from 'react';
import { shallow } from 'enzyme';

import { ShaveNav } from './Shave-nav';

describe('<ShaveNav />', () => {
  it('should render without crashing', () => {
    const props = {
      dispatch: jest.fn(),
    };
    const wrapper = shallow(<ShaveNav {...props} />)
  });
});
