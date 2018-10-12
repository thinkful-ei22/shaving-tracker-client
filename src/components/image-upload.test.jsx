import React from 'react';
import { shallow } from 'enzyme';

import { ImageUpload } from './Image-upload';

describe('<ImageUpload />', () => {
  it('should render without crashing', () => {
    const props = {
      dispatch: jest.fn(),
    };
    const wrapper = shallow(<ImageUpload {...props} />)
  });
});
