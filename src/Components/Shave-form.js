import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/product';
import './styles/shave-form.css';

class ShaveForm extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }
  
  render() {
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
    let productsObj = {};
    if (this.props.userProducts) {
      // initializes productsObj
      this.props.userProducts.forEach(product => {
        productsObj[product.productType] = [];
      });
      // pushes correct products into each array in the object
      this.props.userProducts.forEach(product => {
        productsObj[product.productType].push(product);
      });
    }
    console.log(productsObj);

    let productSelects = [];
    for (let key in productsObj) {
      console.log(key);
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