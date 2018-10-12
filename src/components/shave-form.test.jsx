import React from 'react';
import { shallow } from 'enzyme';

import { ShaveForm } from './Shave-form';

describe('<ShaveForm />', () => {
  it('should render without crashing', () => {
    const props = {
      dispatch: jest.fn(),
    };
    const wrapper = shallow(<ShaveForm {...props} />)
  });
});
