import React from 'react';
import { connect } from 'react-redux';
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
    const { error } = this.props;
    const { state } = this;
    if (error) {
      errorMessage = (
        <div className="login-error" aria-live="polite">
          {error.message}
        </div>
      );
    }

    const typeList = state.type.map(type => (
      <option value={type.toLowerCase()} key={type}>{type}</option>
    ));

    return (
      <form onSubmit={e => this.onSubmit(e)}>
        {errorMessage}
        <select onChange={e => this.handleProductChange(e)} name="productType" id="productType">
          <option defaultValue value="razor">Razor</option>
          <option value="blade">Blade</option>
          <option value="brush">Brush</option>
          <option value="lather">Lather</option>
          <option value="aftershave">Aftershave</option>
          <option value="additonalcare">Additional Care</option>
        </select>
        <select id="subtype" name="subtype">{typeList}</select>
        <input name="brand" placeholder="brand" />
        <input name="model" placeholder="model" />
        <input name="nickname" placeholder="nickname" />
        <textarea name="comment" placeholder="Comment/Notes" />
        <button type="submit">Submit</button>
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
  loading: state.productReducer.loading,
  error: state.productReducer.error,
});


export default connect(mapStateToProps)(ProductForm);
