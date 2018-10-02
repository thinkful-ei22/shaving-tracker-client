import React from 'react';
import { connect } from 'react-redux';
import { addImage } from '../actions/image';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
  }

  onChange(e) {
    const { dispatch } = this.props;
    const errs = [];
    const file = Array.from(e.target.files)[0];
    const formData = new FormData();
    if (file) {
      const types = ['image/png', 'image/jpeg', 'image/gif'];
      if (types.every(type => file.type !== type)) {
        errs.push(`'${file.type}' is not a supported format`);
      }
      if (file.size > 150000) {
        errs.push(`'${file.name}' is too large, please pick a smaller file`);
      }
      console.log(errs);
      this.setState({ errors: errs });
      if (errs.length < 1) {
        formData.append('file', file);
        dispatch(addImage(formData));
      }
    }
  }

  render() {
    const { image, loading, error } = this.props;
    const { errors } = this.state;
    const errorResponse = errors.map((error, i) => <div key={i}>{error}</div>);
    let response;
    if (loading) {
      response = <div>Loading annimation here!</div>;
    } else if (error) {
      response = <div>{error}</div>;
    } else if (image) {
      response = (
        <img src={image.secure_url} alt="" />
      );
    }
    return (
      <div>
        <div>{errorResponse}</div>
        {response}
        <label htmlFor="single">
          <input type="file" id="single" name="singleImage" onChange={e => this.onChange(e)} />
        </label>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { image, loading, error } = state.image;
  return ({ image, loading, error });
};

export default connect(mapStateToProps)(ImageUpload);
