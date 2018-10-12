import React from 'react';
import { shallow } from 'enzyme';

import { CommunityShaveHistory } from './Community-shave-history';

describe('<CommunityShaveHistory />', () => {
  it('should render without crashing', () => {
    const props = {
      dispatch: jest.fn()
    };
    const wrapper = shallow(<CommunityShaveHistory {...props} />)
  });
});
