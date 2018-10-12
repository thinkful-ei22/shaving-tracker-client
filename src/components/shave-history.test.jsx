import React from 'react';
import { shallow } from 'enzyme';

import { ShaveHistory } from './Shave-history';

describe('<ShaveHistory />', () => {
  it('should render without crashing', () => {
    const props = {
      dispatch: jest.fn(),
    };
    const wrapper = shallow(<ShaveHistory {...props} />)
  });
});
