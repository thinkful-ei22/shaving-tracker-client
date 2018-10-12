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
import CSVProducts from './Csv-products';

import razorIcon from './icons/razor.png';
import bladeIcon from './icons/blade.png';
import brushIcon from './icons/brush.png';
import latherIcon from './icons/lather1.png';
import afterIcon from './icons/after1.png';
import additionalIcon from './icons/additional.png';

export class MyCollection extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      useIcons: window.innerWidth <= 760
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchProducts());

    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({useIcons: window.innerWidth <= 760});
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

    const tabs = this.state.useIcons
      ?
        ([<Tab key="razor"><img src={razorIcon} height="18" alt="Razors"></img></Tab>,
        <Tab key="blade"><img src={bladeIcon} height="18" alt="Blades"></img></Tab>,
        <Tab key="brush"><img src={brushIcon} height="18" alt="Brushes"></img></Tab>,
        <Tab key="lather"><img src={latherIcon} height="18" alt="Lathers"></img></Tab>,
        <Tab key="after"><img src={afterIcon} height="18" alt="Aftershaves"></img></Tab>,
        <Tab key="additional"><img src={additionalIcon} height="18" alt="Additional Cares"></img></Tab>])
      :
        ([<Tab key="razor">Razors</Tab>,
        <Tab key="blade">Blades</Tab>,
        <Tab key="brush">Brushes</Tab>,
        <Tab key="lather">Lathers</Tab>,
        <Tab key="after">Aftershaves</Tab>,
        <Tab key="additional">Additional Cares</Tab>]);

    return (
      <div className="product-container">
        <h2>My Collection</h2>
        <ProductForm />
        <CSVProducts />
        <Tabs className="product-list">
          {newUserIntro}
          <div className="collection-content">
            <TabList className="product-tabs">
              <Tab>All</Tab>
              {tabs}
            </TabList>
            {collections}
          </div>
        </Tabs>
        <div className="collection-footer">Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>
      </div>
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
