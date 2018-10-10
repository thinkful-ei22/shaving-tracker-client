import React from 'react';
import { connect } from 'react-redux';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import ProductForm from './Product-form';
import 'react-tabs/style/react-tabs.css';
import requiresLogin from './requires-login';
import './styles/mycollections.css';
import { fetchProducts } from '../actions/product';
import CollectionCard from './Collection-card';

class MyCollection extends React.Component {
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
        <div className="collection-list-container">
          {productType[product].map(item => <CollectionCard {...item} key={item.id} />)}
        </div>
      </TabPanel>
    ));

    return (
      <Tabs className="product-list">
        <ProductForm />
        {newUserIntro}
        <div className="collection-content">
          <TabList className="product-tabs">
            <Tab>All</Tab>
            <Tab>Razors</Tab>
            <Tab>Blades</Tab>
            <Tab>Brushes</Tab>
            <Tab>Lathers</Tab>
            <Tab>Aftershaves</Tab>
            <Tab>Addtional Cares</Tab>
          </TabList>
          {collections}
        </div>
      </Tabs>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.product.loading,
  error: state.product.error,
  products: state.product.userProducts,
});


export default requiresLogin()(connect(mapStateToProps)(MyCollection));
