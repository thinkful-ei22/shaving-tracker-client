import React from 'react';
import { connect } from 'react-redux';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';

import './styles/mycollection.css';
import { fetchCollection } from '../actions/get-collection';
import CollectionCard from './Collection-card';
import 'react-tabs/style/react-tabs.css';

class MyCollection extends React.Component {
  componentDidMount() {
    const { dispatch, userId } = this.props;
    dispatch(fetchCollection(userId));
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

    const collections = Object.keys(productType).map(product => (
      <TabPanel key={product}>
        {productType[product].map(item => <div key={item.id}><CollectionCard {...item} /></div>)}
      </TabPanel>
    ));

    return (
      <Tabs>
        <TabList>
          <Tab>All</Tab>
          <Tab>Razors</Tab>
          <Tab>Blades</Tab>
          <Tab>Brushes</Tab>
          <Tab>Lathers</Tab>
          <Tab>Aftershaves</Tab>
          <Tab>Addtional Cares</Tab>
        </TabList>
        {collections}
      </Tabs>
    );
  }
}

const mapStateToProps = state => ({
  products: state.collection.products,
  loading: state.collection.loading,
  error: state.collection.error,
});

export default connect(mapStateToProps)(MyCollection);
