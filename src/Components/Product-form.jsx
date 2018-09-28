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
      type: ['Subtypes', 'Double Edge', 'Straight Razor', 'Shavette', 'Cartidge', 'Single Edge'],
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      productType: e.target.productType.value === '' ? null : e.target.productType.value,
      brand: e.target.brand.value,
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
      this.setState({ type: ['Subtypes', 'Double Edge', 'Straight Razor', 'Shavette', 'Cartidge', 'Single Edge'] });
    } else if (e.target.value === 'brush') {
      this.setState({ type: ['Subtypes', 'Badger', 'Boar', 'Horse', 'Synthetic'] });
    } else if (e.target.value === 'lather') {
      this.setState({ type: ['Subtypes', 'Cream', 'Soap', 'Oil'] });
    } else {
      this.setState({ type: ['Subtypes'] });
    }
  }

  render() {
    let errorMessage;
    let loadingWheel;
    const { error, loading } = this.props;
    const { state } = this;
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

    const typeList = state.type.map(type => (
      <option value={type.toLowerCase()} key={type}>{type}</option>
    ));

    return (
      <form className="form" onSubmit={e => this.onSubmit(e)}>
        <h3>Add Product</h3>
        {errorMessage}
        {loadingWheel}
        <select className="col-5" onChange={e => this.handleProductChange(e)} name="productType" id="productType">
          <option defaultValue value="razor">Razor</option>
          <option value="blade">Blade</option>
          <option value="brush">Brush</option>
          <option value="lather">Lather</option>
          <option value="aftershave">Aftershave</option>
          <option value="additonalcare">Additional Care</option>
        </select>
        <select className="col-5" id="subtype" name="subtype">
          {typeList}
        </select>
        <input className="col-5" name="brand" placeholder="brand" />
        <input className="col-5" name="model" placeholder="model" />
        <input className="col-5" name="nickname" placeholder="nickname" />
        <textarea className="col-5" name="comment" placeholder="Comment/Notes" />
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
