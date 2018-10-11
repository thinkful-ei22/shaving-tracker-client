import React from 'react';
import { shallow } from 'enzyme';

import { CSVProducts } from './Csv-products';

describe('<CSVProducts />', () => {
  it('should render without crashing', () => {
    const props = {
      addManyProductResponse: []
    };
    const wrapper = shallow(<CSVProducts {...props} />)
  });
});
