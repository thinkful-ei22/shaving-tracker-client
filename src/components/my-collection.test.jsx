import React from 'react';
import { shallow } from 'enzyme';

import { MyCollection } from './My-Collection';

describe('<MyCollection />', () => {
  it('should render without crashing', () => {
    const props = {
      dispatch: jest.fn(),
    };
    const wrapper = shallow(<MyCollection {...props} />)
  });
});
