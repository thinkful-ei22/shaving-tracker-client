import React from 'react';
import { connect } from 'react-redux';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import PropTypes from 'prop-types';

import 'react-tabs/style/react-tabs.css';
import './styles/mycollections.css';
import requiresLogin from './requires-login';
import ProductForm from './Product-form';
import CollectionCard from './Collection-card';
import { fetchProducts } from '../actions/product';

export class MyCollection extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchProducts());
  }

  render() {
    const { products } = this.props;
    const categorizedProducts = {
      all: [],
      razor: [],
      blade: [],
      brush: [],
      lather: [],
      aftershave: [],
      additionalcare: [],
    };
    const productType = products.reduce((obj, product) => {
      const tempObj = obj;
      const type = product.productType;
      if (!obj[type]) {
        tempObj[type] = [product];
      } else {
        tempObj[type] = [...tempObj[type], product];
      }
      tempObj.all.push(product);
      return tempObj;
    }, categorizedProducts);

    const newUserIntro = 
      categorizedProducts.razor.length === 0 || categorizedProducts.blade.length === 0
      ? <div className="no-products-message">
          <p>New to --SITENAME--? To begin, add a razor, a blade, and any other products you wish using the +Product button!</p>
        </div> 
      : '';
    
    const collections = Object.keys(productType).map(product => (
      <TabPanel key={product} className="collection-list">
        {productType[product].map(item => <div key={item.id}><CollectionCard {...item} /></div>)}
      </TabPanel>
    ));

    return (
      <Tabs className="product-list">
        <ProductForm />
        <TabList>
          <Tab>All</Tab>
          <Tab>Razors</Tab>
          <Tab>Blades</Tab>
          <Tab>Brushes</Tab>
          <Tab>Lathers</Tab>
          <Tab>Aftershaves</Tab>
          <Tab>Addtional Cares</Tab>
        </TabList>
        {newUserIntro}
        {collections}
      </Tabs>
    );
  }
}

MyCollection.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
  dispatch: PropTypes.func.isRequired,
}

MyCollection.defaultProps = {
  products: [],
}

const mapStateToProps = state => ({
  loading: state.product.loading,
  error: state.product.error,
  products: state.product.userProducts,
});


export default requiresLogin()(connect(mapStateToProps)(MyCollection));
