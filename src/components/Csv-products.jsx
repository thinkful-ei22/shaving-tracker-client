import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import 'react-tabs/style/react-tabs.css';
import './styles/mycollections.css';
import CSVReader from './Csv-reader';
import CSVProductsCard from './Csv-products-card';
import { addManyProducts, clearAddManyResponse } from '../actions/product';
import requiresLogin from './requires-login';

export class CSVProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filename: '',
      errors: [],
      showModal: false,
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
    this.props.dispatch(clearAddManyResponse());
    this.setState({products:[], errors: []});
  }

  handleUpload(data, filename) {
    this.setState({products: data, filename});
    this.props.dispatch(clearAddManyResponse());
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
      this.props.dispatch(addManyProducts(products))
      this.setState({products:[], errors: []})
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
    const { addManyProductResponse } = this.props;
    let submitResponse
    if (addManyProductResponse.length > 0) {
      submitResponse = addManyProductResponse.map((res, i) => {
        if (res.status !== 200) {
          return <div className="login-error" key={`res-${i}`}>{`Product ${i+1} already exists`}</div>
        } else {
          return <div key={`res-${i}`}>{`Product ${i+1} successfully created!`}</div>
        }
      })
    }
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
      <div>
        <button className="csv add-product-button" onClick={this.handleOpenModal}>CSV + Product</button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          className="Modal"
          overlayClassName="Overlay"
          ariaHideApp={false}
        >
          <form className="form" onSubmit={e => this.handleSubmit(e)}>
            <h2>Upload your Products</h2>
            {reader}
            {response}
            {errorResponse}
            {submitResponse}
            {submit}
            <button className="close" type="button" onClick={this.handleCloseModal} />
          </form>
        </ReactModal>
      </div>
    );
  }
}

CSVProducts.propTypes = {
  addManyProductResponse: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  addManyProductResponse: state.product.manyProductsResponse,
})

export default requiresLogin()(connect(mapStateToProps)(CSVProducts));
