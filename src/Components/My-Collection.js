import React from 'react';
import './styles/mycollection.css';
import {fetchCollection} from '../actions/get-collection';
import CollectionCard from './Collection-card';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {connect} from 'react-redux';

class MyCollection extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchCollection(this.props.userId));
  }
  
  
  render() {
    const products = {
      all: [],
      razor: [],
      blade: [],
      brush: [],
      lather: [],
      aftershave: [],
      additionalcare: []
    }
    const productType = this.props.products.reduce((obj, product) => {
      const type = product.productType;
      if (!obj[type]) {
        obj[type] = [product]
      }
      else {
        obj[type] = [...obj[type], product];
      }
      obj.all.push(product);
      return obj;
    }, products)

    // console.log(productType);

   const collections = Object.keys(productType).map((product, index) => {
     console.log(productType[product]);
      return (
        <TabPanel key={index}>
          {productType[product].map((item) => {
           return <div key={item.id}><CollectionCard {...item}/></div>
          })}
        </TabPanel>
      )
    })

    return(
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
        {/* <TabPanel>
          {collection}
        </TabPanel>
        <TabPanel>
          {collection}
        </TabPanel>
        <TabPanel>
          <p>Blades</p>
        </TabPanel>
        <TabPanel>
          <p>Brushes</p>
        </TabPanel>
        <TabPanel>
          <p>Lathers</p>
        </TabPanel>
        <TabPanel>
          <p>Aftershaves</p>
        </TabPanel>
        <TabPanel>
          <p>Additional Cares</p>
        </TabPanel> */}
        
      </Tabs>
    )
  }
}

const mapStateToProps = state => ({
  products: state.collection.products,
  loading: state.collection.loading,
  error: state.collection.error
})

export default connect(mapStateToProps)(MyCollection);