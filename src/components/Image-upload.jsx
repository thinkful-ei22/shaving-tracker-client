import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addImage, removeImage } from '../actions/image';

export class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(removeImage());
  }

  onChange(e) {
    const { dispatch } = this.props;
    dispatch(removeImage());
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
      response = <div className="loader"/>;
    } else if (error) {
      response = <div>{error}</div>;
    } else if (image) {
      response = (
        <img src={image.secure_url} alt="" />
      );
    }
    return (
      <div>
        {errorResponse}
        {response}
        <label htmlFor="single">
          Select Image:
        </label>
        <input className="col-5" type="file" id="single" name="singleImage" onChange={e => this.onChange(e)} />
      </div>
    );
  }
}

ImageUpload.propTypes = {
  image: PropTypes.shape({
    secure_url: PropTypes.string,
  }),
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.shape({
    status: PropTypes.number,
    message: PropTypes.string,
  }),
};

ImageUpload.defaultProps = {
  image: {},
  loading: false,
  error: {},
};
const mapStateToProps = (state) => {
  const { image, loading, error } = state.image;
  return ({ image, loading, error });
};

export default connect(mapStateToProps)(ImageUpload);
