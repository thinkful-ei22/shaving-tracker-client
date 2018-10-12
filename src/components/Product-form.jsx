import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import './styles/loader.css';
import './styles/form.css';
import PropTypes from 'prop-types';
import requiresLogin from './requires-login';
import ImageUpload from './Image-upload';
import { addProduct, clearErr } from '../actions/product';

export class ProductForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // types: ['Double Edge', 'Straight Razor', 'Shavette', 'Cartidge', 'Single Edge'],
      types: [],
      brand: '',
      model: '',
      nickname: '',
      showModal: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    const { dispatch } = this.props;
    this.setState({ showModal: false, nickname: '' });
    dispatch(clearErr());
  }

  onSubmit(e) {
    e.preventDefault();
    const { image, dispatch } = this.props;
    const data = {
      productType: e.target.productType.value,
      brand: e.target.brand.value,
      model: e.target.model.value,
      nickname: e.target.nickname.value,
      comment: e.target.comment.value,
      subtype: e.target.subtype.value === 'subtypes' ? null : e.target.subtype.value,
      imageUrl: image ? image.secure_url : null,
    };
    dispatch(addProduct(data, this.handleCloseModal));
  }

  handleProductChange(e) {
    if (e.target.value === 'razor') {
      this.setState({ types: ['Double Edge', 'Straight Razor', 'Shavette', 'Cartidge', 'Single Edge'] });
    } else if (e.target.value === 'brush') {
      this.setState({ types: ['Badger', 'Boar', 'Horse', 'Synthetic'] });
    } else if (e.target.value === 'lather') {
      this.setState({ types: ['Cream', 'Soap', 'Oil'] });
    } else {
      this.setState({ types: [] });
    }
  }

  handleNickname(e) {
    if (e.target.name === 'brand') {
      this.setState({ brand: e.target.value }, () => {
        const { brand, model } = this.state;
        this.setState({ nickname: `${brand} ${model}` });
      });
    }
    if (e.target.name === 'model') {
      this.setState({ model: e.target.value }, () => {
        const { brand, model } = this.state;
        this.setState({ nickname: `${brand} ${model}` });
      });
    }
  }

  handleNicknameChange(e) {
    this.setState({ nickname: e.target.value });
  }

  render() {
    let errorMessage;
    let loadingWheel;
    const { error, loading } = this.props;
    const { types, nickname } = this.state;
    if (error) {
      errorMessage = (
        <div className="login-error" aria-live="polite">
          {error}
        </div>
      );
    }

    if (loading) {
      loadingWheel = <div className="loader" />;
    }

    const typeList = types.map(type => (
      <option value={type.toLowerCase()} key={type}>{type}</option>
    ));

    return (
      <div>
        <button className="add-product-button" onClick={this.handleOpenModal}>+ Product</button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          className="Modal"
          overlayClassName="Overlay"
          ariaHideApp={false}
        >
          <form className="form" onSubmit={e => this.onSubmit(e)}>
            <h3>Add Product</h3>
            {errorMessage}
            {loadingWheel}
            <ImageUpload />
            <label className="form-label" htmlFor="productType">Select Product Type: </label>
            <select defaultValue=""
              className="col-5"
              onChange={e => this.handleProductChange(e)}
              name="productType"
              id="productType"
              required
            >
              <option value="" disabled>Product Type</option>
              <option value="razor">Razor</option>
              <option value="blade">Blade</option>
              <option value="brush">Brush</option>
              <option value="lather">Lather</option>
              <option value="aftershave">Aftershave</option>
              <option value="additionalcare">Additional Care</option>
            </select>
            <label className="form-label"  htmlFor="subtype">Select Product Subtype:</label>
            <select defaultValue=""
              className="col-5"
              id="subtype"
              name="subtype"
              required={this.state.types.length > 0}
            >
              <option value="" disabled>Subtype</option>
              {typeList}
            </select>
            <label className="form-label" htmlFor="brand">
              Brand
            </label>
            <input className="col-5" id="brand" name="brand" placeholder="brand" onChange={e => this.handleNickname(e)} required />
            <label className="form-label"  htmlFor="model">
              Model
            </label>
            <input className="col-5" id="model" name="model" placeholder="model" onChange={e => this.handleNickname(e)} required />
            <label className="form-label" htmlFor="nickname">
              Nickname
            </label>
            <input className="col-5" id="nickname" name="nickname" placeholder="nickname" value={nickname} onChange={e => this.handleNicknameChange(e)} />
            <label htmlFor="comment">
              Comments
            </label>
            <textarea className="col-5" id="comment" name="comment" placeholder="Comment/Notes" />
            <button className="col-3" type="submit">Submit</button>
            <button className="close" type="button" onClick={this.handleCloseModal} />
          </form>
        </ReactModal>
      </div>
    );
  }
}

ProductForm.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  image: PropTypes.shape({
    secure_url: PropTypes.string,
  }),
};

ProductForm.defaultProps = {
  loading: false,
  error: '',
  image: {},
};

const mapStateToProps = state => ({
  loading: state.product.loading,
  error: state.product.error,
  image: state.image.image,
});


export default requiresLogin()(connect(mapStateToProps)(ProductForm));
