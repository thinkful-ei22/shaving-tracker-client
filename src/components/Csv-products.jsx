import React from 'react';
import { connect } from 'react-redux';
import 'react-tabs/style/react-tabs.css';
import './styles/mycollections.css';
import CSVReader from './Csv-reader';
import CSVProductsCard from './Csv-products-card';
import { addProduct } from '../actions/product';
import requiresLogin from './requires-login';



class CSVProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filename: '',
      errors: [],
    }
  }

  handleUpload(data, filename) {
    this.setState({products: data, filename});
  }

  handleSubmit(e) {
    // handlesubmit will just upload the files from the store
    const possibleProductType = ['razor','blade','brush','lather','aftershave','additionalcare'];
    const possibleRazorType = ['Double Edge', 'Straight Razor', 'Shavette', 'Cartidge', 'Single Edge']
    const possibleBrushType = ['Badger', 'Boar', 'Horse', 'Synthetic'];
    const possibleLatherTypes = ['Cream', 'Soap', 'Oil'];
    e.preventDefault();
    const { products } = this.state;
    let errors = [];
    products.forEach((product,index) => {
      if (!new RegExp(possibleProductType.join('|'), 'i').test(product.productType)) {
        errors.push({
          product, errorMsg: 'Invalid Product Type', index,
        })
      } else if (/razor/i.test(product.productType)) {
        if (!new RegExp(possibleRazorType.join('|'), 'i').test(product.subtype)) {
          errors.push({
            product, errorMsg: 'Invalid Razor Subtype', index,
          })
        }
      } else if (/brush/i.test(product.productType)) {
        if (!new RegExp(possibleBrushType.join('|'), 'i').test(product.subtype)) {
          errors.push({
            product, errorMsg: 'Invalid Brush Subtype', index,
          })
        }
      } else if (/lather/i.test(product.productType)) {
        if (!new RegExp(possibleLatherTypes.join('|'), 'i').test(product.subtype)) {
          errors.push({
            product, errorMsg: 'Invalid Lather Subtype', index,
          })
        }
      }
      if (errors.length > 0) {
        this.setState({errors})
      }
    });

    if (errors.length < 1) {
      // if no errors, then we can submit otherwise spit out a error message
      products.forEach(product => {
        this.props.dispatch(addProduct(product))
      })
      this.setState({products: [], errors: []})
    }
  }

  handleChange(e) {
    const { products } = this.state;
    const id = e.target.name.split(' ');
    const newProducts = products.slice(0);
    newProducts[id[1]][id[0]] = e.target.value;
    if (id[0] === 'productType') {
      switch(newProducts[id[1]][id[0]]) {
        case 'razor':
          newProducts[id[1]].subtype = 'Double Edge';
          break;
        case 'brush':
          newProducts[id[1]].subtype = 'Badger';
          break;
        case 'lather':
          newProducts[id[1]].subtype = 'Cream';
          break;
        default:
          newProducts[id[1]].subtype = 'none';
      }
    }
    this.setState({products: newProducts})
  }

  handleRemove(e) {
    const { products } = this.state;
    const id = e.target.name.split(' ');
    this.setState({
      products: products.filter((el, i) => i.toString() !== id[1]),
      errors: [],
    })
  }

  render() {
    const { products, errors, filename } = this.state;
    const errorResponse = errors.map((error, i) => {
      const {errorMsg, index} = error;
      return (
        // borrowing red style for now
        <div key={i} className="login-error">{`You need to fix ${errorMsg} on product ${index+1}`}</div>
      );
    });
    const response = products.map((product, i) => {
      return (
      <div key={`csv-product-${i}`}>
        <CSVProductsCard 
          {...product} 
          index={i}
          handleChange={e => this.handleChange(e)}
          handleRemove={e => this.handleRemove(e)}
        />
      </div>);
    }) 
    let reader;
    if (products.length < 1) {
      reader = (
        <CSVReader
          onFileLoaded={(data, filename) => this.handleUpload(data, filename)}
        />
      )
    } else {
      reader = <h3>{`Extracted files from ${filename}`}</h3>
    }
    const submit = this.state.products.length > 0 ? <button type="submit">+ Add All</button> : null;
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        {reader}
        {response}
        {errorResponse}
        {submit}
      </form>
    );
  }
}


export default requiresLogin()(connect()(CSVProducts));
