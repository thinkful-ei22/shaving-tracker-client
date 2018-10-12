import React from 'react';
import { shallow } from 'enzyme';

import CollectionCard from './Collection-card';

describe('<CollectionCard />', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<CollectionCard />);
  });
});
