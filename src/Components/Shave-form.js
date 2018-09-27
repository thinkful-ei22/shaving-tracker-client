import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/product';
import './styles/shave-form.css';

class ShaveForm extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }
  
  render() {
    console.log(this.props.userProducts);
    // for (let field in this.props.userProducts) {
    //   if (field !== 'userId' && field !=='id') {
    //     console.log(field);
    //   }
    // }
    let razors;
    let blades;
    let brushes;
    let lathers;
    let aftershaves;
    let additionalCares;
    if (this.props.userProducts) {
      razors = this.props.userProducts.razor.map(
        razor => {
          return (<option key={razor._id} value={razor._id}>{razor.nickname}</option>);
        }
      );
      blades = this.props.userProducts.blade.map(
        blade => {
          return (<option key={blade._id} value={blade._id}>{blade.nickname}</option>);
        }
      );
      brushes = this.props.userProducts.brush.map(
        brush => {
          return (<option key={brush._id} value={brush._id}>{brush.nickname}</option>);
        }
      );
      lathers = this.props.userProducts.lather.map(
        lather => {
          return (<option key={lather._id} value={lather._id}>{lather.nickname}</option>);
        }
      );
      aftershaves = this.props.userProducts.aftershave.map(
        aftershave => {
          return (<option key={aftershave._id} value={aftershave._id}>{aftershave.nickname}</option>);
        }
      );
      additionalCares = this.props.userProducts.additionalCare.map(
        additionalCare => {
          return (<option key={additionalCare._id} value={additionalCare._id}>{additionalCare.nickname}</option>);
        }
      );
    }
      
    return (
      <form>
        <select>
          {razors}
        </select>
        <select>
          {blades}
        </select>
        <select>
          {brushes}
        </select>
        <select>
          {lathers}
        </select>
        <select>
          {aftershaves}
        </select>
        <select>
          {additionalCares}
        </select>
        <div className="rate">
          <input type="radio" id="star5" name="rate" value="5" />
          <label htmlFor="star5" title="text">5 stars</label>
          <input type="radio" id="star4" name="rate" value="4" />
          <label htmlFor="star4" title="text">4 stars</label>
          <input type="radio" id="star3" name="rate" value="3" />
          <label htmlFor="star3" title="text">3 stars</label>
          <input type="radio" id="star2" name="rate" value="2" />
          <label htmlFor="star2" title="text">2 stars</label>
          <input type="radio" id="star1" name="rate" value="1" />
          <label htmlFor="star1" title="text">1 star</label>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.productReducer.loading,
  error: state.productReducer.error,
  userProducts: state.productReducer.userProducts,
});

export default connect(mapStateToProps)(ShaveForm);