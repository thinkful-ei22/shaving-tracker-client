import React from 'react';
import { connect } from 'react-redux';
import './styles/loader.css';
import './styles/form.css';
import PropTypes from 'prop-types';
import { addProduct } from '../actions/product';

class ProductForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      types: ['Double Edge', 'Straight Razor', 'Shavette', 'Cartidge', 'Single Edge'],
      brand: '',
      model: '',
      nickname: '',
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      productType: e.target.productType.value === '' ? null : e.target.productType.value,
      brand: e.target.brand.value === '' ? null : e.target.brand.value,
      model: e.target.model.value,
      nickname: e.target.nickname.value,
      comment: e.target.comment.value,
      subtype: e.target.subtype.value === 'subtypes' ? null : e.target.subtype.value,
    };
    const { dispatch } = this.props;
    dispatch(addProduct(data));
  }

  handleProductChange(e) {
    if (e.target.value === 'razor') {
      this.setState({ types: ['Subtypes', 'Double Edge', 'Straight Razor', 'Shavette', 'Cartidge', 'Single Edge'] });
    } else if (e.target.value === 'brush') {
      this.setState({ types: ['Subtypes', 'Badger', 'Boar', 'Horse', 'Synthetic'] });
    } else if (e.target.value === 'lather') {
      this.setState({ types: ['Subtypes', 'Cream', 'Soap', 'Oil'] });
    } else {
      this.setState({ types: ['Subtypes'] });
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
          {error.message}
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
      <form className="form" onSubmit={e => this.onSubmit(e)}>
        <h3>Add Product</h3>
        {errorMessage}
        {loadingWheel}
        <label htmlFor="productType">Select Product Type: </label>
        <select defaultValue="" className="col-5" onChange={e => this.handleProductChange(e)} name="productType" id="productType">
          <option value="" disabled>Product Type</option>
          <option value="razor">Razor</option>
          <option value="blade">Blade</option>
          <option value="brush">Brush</option>
          <option value="lather">Lather</option>
          <option value="aftershave">Aftershave</option>
          <option value="additonalcare">Additional Care</option>
        </select>
        <label htmlFor="subtype">Select Product Subtype:</label>
        <select defaultValue="" className="col-5" id="subtype" name="subtype">
          <option value="" disabled>Subtype</option>
          {typeList}
        </select>
        <label htmlFor="brand">
          <span>Brand</span>
        </label>
        <input className="col-5" id="brand" name="brand" placeholder="brand" onChange={e => this.handleNickname(e)} />
        <label htmlFor="model">
          <span>Model</span>
        </label>
        <input className="col-5" id="model" name="model" placeholder="model" onChange={e => this.handleNickname(e)} />
        <label htmlFor="nickname">
          <span>Nickname</span>
        </label>
        <input className="col-5" id="nickname" name="nickname" placeholder="nickname" value={nickname} onChange={e => this.handleNicknameChange(e)} />
        <label htmlFor="comment">
          <span>Comments</span>
        </label>
        <textarea className="col-5" id="comment" name="comment" placeholder="Comment/Notes" />
        <button className="col-3" type="submit">Submit</button>
      </form>
    );
  }
}

ProductForm.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.shape({
    status: PropTypes.number,
    message: PropTypes.string,
  }),
  dispatch: PropTypes.func.isRequired,
};

ProductForm.defaultProps = {
  loading: false,
  error: {},
};

const mapStateToProps = state => ({
  loading: state.product.loading,
  error: state.product.error,
});


export default connect(mapStateToProps)(ProductForm);
