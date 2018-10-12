import React from 'react';
import { shallow } from 'enzyme';

import CSVReader from './Csv-reader';

describe('<CSVReader />', () => {
  it('should render without crashing', () => {
    const props = {
      onFileLoaded: jest.fn()
    };
    const wrapper = shallow(<CSVReader {...props} />)
  });
});
