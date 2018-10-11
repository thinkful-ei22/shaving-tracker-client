import React from 'react';
import { shallow } from 'enzyme';

import CSVProductsCard from './Csv-products-card';

describe('<CSVProductsCard />', () => {
  it('should render without crashing', () => {
    const props = {
      index: 0,
      handleChange: jest.fn(),
      handleRemove: jest.fn(),
    };
    const wrapper = shallow(<CSVProductsCard {...props} />)
  });
});
