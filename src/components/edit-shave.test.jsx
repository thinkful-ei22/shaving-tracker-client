import React from 'react';
import { shallow } from 'enzyme';

import { EditShaves } from './Edit-shave';

describe('<EditShaves />', () => {
  it('should render without crashing', () => {
    const props = {
      dispatch: jest.fn(),
      shaveItem: {},
    };
    const wrapper = shallow(<EditShaves {...props} />)
  });
});
