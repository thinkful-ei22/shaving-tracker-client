import React from 'react';
import { connect } from 'react-redux';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import { Link } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import './styles/mycollections.css';
import CollectionCard from './Collection-card';
import CSVReader from './Csv-reader';


class CSVProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }

  handleUpload(data, filename) {
    console.log(data, filename);
    console.log(data);
    this.setState({products: data});
  }

  render() {
    const { products } = this.state;
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
      <TabPanel key={product} className="collection-list">
        {productType[product].map(item => <div key={item.id}><CollectionCard {...item} /></div>)}
      </TabPanel>
    ));

    return (
      <div>
        <CSVReader
            onFileLoaded={(data, filename) => this.handleUpload(data, filename)}
          />
        <Tabs className="product-list">
          <Link className="product-form-link" to="/product-form"><button type="button">+ Product</button></Link>
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
      </div>
    );
  }
}


export default connect()(CSVProducts);
