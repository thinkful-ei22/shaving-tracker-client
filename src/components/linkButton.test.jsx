import React from 'react';
import { shallow } from 'enzyme';

import { LinkButton } from './LinkButton';

describe('<LinkButton />', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<LinkButton />)
  });
});
