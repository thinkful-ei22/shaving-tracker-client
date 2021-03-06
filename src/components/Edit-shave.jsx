import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { fetchProducts } from '../actions/product';
import './styles/form.css';
import './styles/stars.css';
import { updateShave } from '../actions/shaves';

export class EditShaves extends React.Component {
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

    const today = moment().format('YYYY-MM-DD');
    const data = {
      razorId: e.target.razor.value ? e.target.razor.value : undefined,
      bladeId: e.target.blade.value ? e.target.blade.value : undefined,
      brushId: e.target.brush.value ? e.target.brush.value : null,
      latherId: e.target.lather.value ? e.target.lather.value : null,
      aftershaveId: e.target.aftershave.value ? e.target.aftershave.value : null,
      additionalCareId: e.target.additionalcare.value ? e.target.additionalcare.value : null,
      rating: e.target.rating.value,
      date: e.target.date.value ? e.target.date.value : today,
      share: e.target.share.checked,
      comments:e.target.comment.value,
    };
    Object.keys(data).forEach(key =>{
      if(typeof data[key] === 'string' && data[key].toLowerCase() === 'none')
        data[key] = null;
    });
    const { dispatch, shaveId } = this.props;
    dispatch(updateShave(data, shaveId));
  }

  render() {
    const productsObj = {};
    const { userProducts, loading, error, shaveId, shaveItem } = this.props;
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

    const defaultRazor = shaveItem.razor ? shaveItem.razor.id : '';
    const defaultBlade = shaveItem.blade ? shaveItem.blade.id : '';
    const defaultBrush = shaveItem.brush ? shaveItem.brush.id : '';
    const defaultLather = shaveItem.lather ? shaveItem.lather.id : '';
    const defaultAftershave = shaveItem.aftershave ? shaveItem.aftershave.id : '';
    const defaultAdditionalCare = shaveItem.additionalCare ? shaveItem.additionalCare.id : '';

    return (
      <div>
        <button type="button" className="weighty-button" onClick={() => this.handleOpenModal(shaveId)}>Edit</button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Edit Shave"
          className="Modal"
          overlayClassName="Overlay"
          ariaHideApp={false}
        >
          <form className="form" onSubmit={e => this.handleEdit(e)}>
            {errorMessage}
            <h3>Edit Shave</h3>
            
            <div className="form-content">

              <label htmlFor="date">
                Date
              </label>
              <input className="" type="date" id="date" name="date"
                defaultValue={moment(shaveItem.date).tz('Atlantic/Azores').format('YYYY-MM-DD')}
              />

              <label htmlFor="razor">
                Select Razor:
              </label>
              <select defaultValue={defaultRazor} className="" id="razor" name="razor" required>
                <option value="" disabled>Select...</option>
                {productsObj ? productsObj.razor : null}
              </select>

              <label htmlFor="blade">
                Select Blade:
              </label>
              <select defaultValue={defaultBlade} className="" id="blade" name="blade" required>
                <option value="" disabled>Select...</option>
                {productsObj ? productsObj.blade : null}
              </select>

              <label htmlFor="brush">
                Select Brush:
              </label>
              <select defaultValue={defaultBrush} className="" id="brush" name="brush">
                <option value="">None</option>
                {productsObj ? productsObj.brush : null}
              </select>

              <label htmlFor="lather">
                Select Lather:
              </label>
              <select defaultValue={defaultLather} className="" id="lather" name="lather">
                <option value="" >None</option>
                {productsObj ? productsObj.lather : null}
              </select>

              <label htmlFor="aftershave">
                Select Aftershave:
              </label>
              <select defaultValue={defaultAftershave} className="" id="aftershave" name="aftershave">
                <option value="" >None</option>
                {productsObj ? productsObj.aftershave : null}
              </select>
              
              <label htmlFor="additionalcare">
                Select Additional Care:
              </label>
              <select defaultValue={defaultAdditionalCare} className="" id="additionalcare" name="additionalcare">
                <option value="" >None</option>
                {productsObj ? productsObj.additionalcare : null}
              </select>

              <textarea className=""
                id="comment"
                name="comment"
                placeholder="Comment/Notes"
                defaultValue={shaveItem.comments}
              />
              <div className="community-checkbox">
                <label htmlFor="share">Share with community?</label>
                <input type="checkbox" name="share" value="share" id="share"
                  defaultChecked={shaveItem.share}
                />
              </div>
              <fieldset className="rating" defaultValue={shaveItem.rating}>
                <legend>Rating:</legend>
                <div>
                  <input type="radio" id="star5" name="rating" value="5" 
                    defaultChecked={shaveItem.rating === 5 ? true : false}
                  />
                  <label htmlFor="star5" className="full" />
                  <input type="radio" id="star4" name="rating" value="4" 
                    defaultChecked={shaveItem.rating === 4 ? true : false}
                  />
                  <label htmlFor="star4" className="full" />
                  <input type="radio" id="star3" name="rating" value="3" 
                    defaultChecked={shaveItem.rating === 3 ? true : false}
                  />
                  <label htmlFor="star3" className="full" />
                  <input type="radio" id="star2" name="rating" value="2"
                    defaultChecked={shaveItem.rating === 2 ? true : false}
                  />
                  <label htmlFor="star2" className="full" />
                  <input type="radio" id="star1" name="rating" value="1"
                    defaultChecked={shaveItem.rating === 1 ? true : false}
                  />
                  <label htmlFor="star1" className="full" />
                </div>
              </fieldset>
              <button type="submit" className="weighty-button">Submit</button>
              <button className="close" type="button" onClick={this.handleCloseModal} />
            </div>
          </form>
        </ReactModal>
      </div>

    );
  }
}

const productShape = {
  brand: PropTypes.string,
  comment: PropTypes.string,
  currentUsage: PropTypes.number,
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  model: PropTypes.string,
  nickname: PropTypes.string,
  productId: PropTypes.string,
  productType: PropTypes.string,
  subtype: PropTypes.string,
  totalUsage: PropTypes.number,
};

EditShaves.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.shape({
    status: PropTypes.number,
    message: PropTypes.string,
  }),
  shaveItem: PropTypes.shape({
    additionalCare: PropTypes.shape(productShape),
    aftershave: PropTypes.shape(productShape),
    blade: PropTypes.shape(productShape),
    brush: PropTypes.shape(productShape),
    date: PropTypes.string,
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    lather: PropTypes.shape(productShape),
    rating: PropTypes.number,
    razor: PropTypes.shape(productShape),
    share: PropTypes.bool,
  }).isRequired,
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
