import React from 'react';
import { connect } from 'react-redux';
import { addImage } from '../actions/image';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      uploading: false,
      images: [],
    };
  }

  onChange(e) {
    console.log(this.props);
    const { dispatch } = this.props;
    const errs = [];
    const file = Array.from(e.target.files)[0];
    const formData = new FormData();
    console.log(file);
    const types = ['image/png', 'image/jpg', 'image/gif'];
    if (types.every(type => file.type !== type)) {
      errs.push(`'${file.type}' is not a supported format`);
    }
    if (file.size > 150000) {
      errs.push(`'${file.name}' is too large, please pick a smaller file`);
    }

    formData.append('file', file);
    dispatch(addImage(formData));
    return this;
  }

  render() {
    return (
      <div>
        <label htmlFor="single">Image Uploader</label>
        <input type="file" id="single" onChange={e => this.onChange(e)} />
      </div>
    );
  }
}

export default connect()(ImageUpload);
