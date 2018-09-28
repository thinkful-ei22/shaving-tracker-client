import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchProducts } from '../actions/product';
import './styles/shave-form.css';
import './styles/loader.css';
import { addShave } from '../actions/shave';

class ShaveForm extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchProducts());
  }

  onSubmit(e) {
    e.preventDefault();
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }

    if (mm < 10) {
      mm = `0${mm}`;
    }

    today = `${yyyy}-${mm}-${dd}`;

    const data = {
      razorId: e.target.razor.value,
      bladeId: e.target.blade.value,
      brushId: e.target.brush.value,
      latherId: e.target.lather.value,
      aftershaveId: e.target.aftershave.value,
      additionalCareId: e.target.additionalcare.value,
      rating: e.target.rating.value,
      date: e.target.date.value ? e.target.date.value : today,
    };
    const { dispatch } = this.props;
    dispatch(addShave(data));
  }

  render() {
    const productsObj = {};
    const { userProducts, loading, error } = this.props;
    if (userProducts) {
      // initializes productsObj
      userProducts.forEach((product) => {
        productsObj[product.productType] = [];
      });
      // pushes correct products into each array in the object
      userProducts.forEach((product) => {
        productsObj[product.productType].push(product);
      });
    }

    if (loading) {
      return <div className="loader" />;
    }

    const keys = Object.keys(productsObj);
    keys.forEach((key) => {
      productsObj[key] = productsObj[key].map(product => (
        <option value={product.id} key={product.id}>{product.nickname}</option>
      ));
    });

    let errorMessage;
    if (error) {
      errorMessage = (
        <div className="login-error" aria-live="polite">
          {error.message}
        </div>
      );
    }

    return (
      <form onSubmit={e => this.onSubmit(e)}>
        {errorMessage}
        <h3>Add Shave</h3>
        <label htmlFor="date">
          Date
          <input type="date" id="date" name="date" />
        </label>
        <label htmlFor="razor">
          Razor
          <select id="razor" name="razor">
            {productsObj ? productsObj.razor : null}
          </select>
        </label>

        <label htmlFor="blade">
          Blade
          <select id="blade" name="blade">
            {productsObj ? productsObj.blade : null}
          </select>
        </label>

        <label htmlFor="brush">
          Brush
          <select id="brush" name="brush">
            {productsObj ? productsObj.brush : null}
          </select>
        </label>

        <label htmlFor="lather">
          Lather
          <select id="lather" name="lather">
            {productsObj ? productsObj.lather : null}
          </select>
        </label>

        <label htmlFor="aftershave">
          Aftershave
          <select id="aftershave" name="aftershave">
            {productsObj ? productsObj.aftershave : null}
          </select>
        </label>

        <label htmlFor="additonalcare">
          Additional Care
          <select id="additionalcare" name="additionalcare">
            {productsObj ? productsObj.additionalcare : null}
          </select>
        </label>

        <input type="radio" id="star5" name="rating" value="5" />
        <input type="radio" id="star4" name="rating" value="4" />
        <input type="radio" id="star3" name="rating" value="3" />
        <input type="radio" id="star2" name="rating" value="2" />
        <input type="radio" id="star1" name="rating" value="1" />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ShaveForm.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.shape({
    status: PropTypes.number,
    message: PropTypes.string,
  }),
  userProducts: PropTypes.arrayOf(
    PropTypes.shape({
      nickname: PropTypes.string,
      comment: PropTypes.string,
      subtype: PropTypes.string,
      brand: PropTypes.string,
      model: PropTypes.string,
      id: PropTypes.string,
      productId: PropTypes.string,
    }),
  ),
  dispatch: PropTypes.func.isRequired,
};

ShaveForm.defaultProps = {
  loading: false,
  error: {},
  userProducts: [],
};

const mapStateToProps = state => ({
  loading: state.productReducer.loading,
  error: state.productReducer.error,
  userProducts: state.productReducer.userProducts,
});

export default connect(mapStateToProps)(ShaveForm);
