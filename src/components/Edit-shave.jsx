import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { fetchProducts } from '../actions/product';
import './styles/form.css';
import './styles/stars.css';
import { updateShave } from '../actions/shaves';

class EditShaves extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchProducts());
  }

  handleEdit(e, id) {
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
      razorId: e.target.razor.value ? e.target.razor.value : null,
      bladeId: e.target.blade.value ? e.target.blade.value : null,
      brushId: e.target.brush.value ? e.target.brush.value : null,
      latherId: e.target.lather.value ? e.target.lather.value : null,
      aftershaveId: e.target.aftershave.value ? e.target.aftershave.value : null,
      additionalCareId: e.target.additionalcare.value ? e.target.additionalcare.value : null,
      rating: e.target.rating.value,
      date: e.target.date.value ? e.target.date.value : today,
      share: e.target.share.checked,
    };
    const { dispatch, shaveId } = this.props;
    dispatch(updateShave(data, shaveId));
  }

  render() {
    const productsObj = {};
    const { userProducts, loading, error, shaveId, nickName } = this.props;
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
      <div>
        <button type="button" onClick={() => this.handleOpenModal(shaveId)}>Edit</button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          className="Modal"
          overlayClassName="Overlay"
          ariaHideApp={false}
        >
          <form className="form" onSubmit={e => this.handleEdit(e)}>
            {errorMessage}
            <h3>Add Shave</h3>
            <label htmlFor="date">
              <span>Date</span>
            </label>
            <input className="col-5" type="date" id="date" name="date" />
            <label htmlFor="razor">
              <span>Select Razor:</span>
            </label>
            <select defaultValue="" className="col-5" id="razor" name="razor">
              <option value="">{nickName.razor}</option>
              {productsObj ? productsObj.razor : null}
            </select>
            <label htmlFor="blade">
              <span>Select Blade:</span>
            </label>
            <select defaultValue="" className="col-5" id="blade" name="blade">
              <option value="">{nickName.blade}</option>
              {productsObj ? productsObj.blade : null}
            </select>
            <label htmlFor="brush">
              <span>Select Brush:</span>
            </label>
            <select defaultValue="" className="col-5" id="brush" name="brush">
              <option value="" disabled>{nickName.brush}</option>
              {productsObj ? productsObj.brush : null}
            </select>
            <label htmlFor="lather">
              <span>Select Lather:</span>
            </label>
            <select defaultValue="" className="col-5" id="lather" name="lather">
              <option value="" disabled>{nickName.lather}</option>
              {productsObj ? productsObj.lather : null}
            </select>
            <label htmlFor="aftershave">
              <span>Select Aftershave:</span>
            </label>
            <select defaultValue="" className="col-5" id="aftershave" name="aftershave">
              <option value="" disabled>{nickName.aftershave}</option>
              {productsObj ? productsObj.aftershave : null}
            </select>
            <label htmlFor="additionalcare">
              <span>Select Additional Care:</span>
            </label>
            <select defaultValue="" className="col-5" id="additionalcare" name="additionalcare">
              <option value="" disabled>{nickName.additionalare}</option>
              {productsObj ? productsObj.additionalcare : null}
            </select>
            
            <label>Share with community?</label>
            <input type="checkbox" name="share" value="share" />

            <fieldset className="rating">
              <legend>Rating:</legend>
              <input type="radio" id="star5" name="rating" value="5" />
              <label htmlFor="star5" className="full" />
              <input type="radio" id="star4" name="rating" value="4" />
              <label htmlFor="star4" className="full" />
              <input type="radio" id="star3" name="rating" value="3" />
              <label htmlFor="star3" className="full" />
              <input type="radio" id="star2" name="rating" value="2" />
              <label htmlFor="star2" className="full" />
              <input type="radio" id="star1" name="rating" value="1" />
              <label htmlFor="star1" className="full" />
            </fieldset>
            <button type="button" onClick={this.handleCloseModal}>Close</button>
            <button type="submit">Submit</button>
          </form>
        </ReactModal>
      </div>

    );
  }
}

EditShaves.propTypes = {
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
EditShaves.defaultProps = {
  loading: false,
  error: {},
  userProducts: [],
};

const mapStateToProps = state => ({
  loading: state.product.loading,
  error: state.product.error,
  userProducts: state.product.userProducts,
});

export default connect(mapStateToProps)(EditShaves);