import React from 'react';
import { shallow } from 'enzyme';

import { ShaveHistoryItems } from './Shave-history-items';

describe('<ShaveHistoryItems />', () => {
  it('should render without crashing', () => {
    const props = {
      dispatch: jest.fn(),
    };
    const wrapper = shallow(<ShaveHistoryItems {...props} />)
  });
});
