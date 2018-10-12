import React from 'react';
import { shallow } from 'enzyme';

import { LandingPage } from './Landing-page';

describe('<LandingPage />', () => {
  it('should render without crashing', () => {
    const props = {
      dispatch: jest.fn(),
    };
    const wrapper = shallow(<LandingPage {...props} />)
  });
});
