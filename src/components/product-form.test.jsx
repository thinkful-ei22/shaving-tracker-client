import React from 'react';
import { shallow } from 'enzyme';

import { ProductForm } from './Product-form';

describe('<ProductForm />', () => {
  it('should render without crashing', () => {
    const props = {
      dispatch: jest.fn(),
    };
    const wrapper = shallow(<ProductForm {...props} />)
  });
});
